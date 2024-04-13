"use client"
import AdminNavbar from '@/app/components/user/UserNavbar'
import Sidebar from '@/app/components/user/Sidebar'
import { db } from '@/db/firebaseConfig'
import Toast from '@/utils/Alert'
import axios from 'axios'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from "yup"
import Layout from '@/app/components/global/Layout'
import UserHero from '@/app/components/user/UserHero'
import FooterUser from '@/app/components/user/FooterUser'
import * as Icons from 'react-icons/bs'
import { makeRequestApi } from '@/utils/makeRequest'
import { useAuthStore } from '@/app/store/authStore'
import Modal from '@/app/components/global/Modal'
import Button from '@/app/components/global/web-default/Buttons'
import DefaultIcon from '@/app/components/global/DefaultIcon'
import Input from '@/app/components/global/web-default/Input'
import Select from '@/app/components/global/web-default/Select'
import Flex from '@/app/components/global/web-default/Flex'

type GenType = {
  withdrawalMethod: string,
  password: string
  amount: number | null,
  accessCode: string
}
type withdrawDataType = GenType & {
  wallet: string
}
type withdrawDataTypeBank = GenType & {
  amount: number | null,
  bankName: string,
  routenNumber: string,
  accountName: string,
  accountNumber: string,
  country: string,

}

const genaralSchema = {
  withdrawalMethod: Yup.string().required(),
  password: Yup.string().required(),
  amount: Yup.number().min(5).required(),
  accessCode: Yup.string().required(),
}

const reuseValue = {
  amount: null,
  withdrawalMethod: '',
  password: '',
  accessCode: ""
}



function page() {


  const { currentUser } = useAuthStore()

  const [openPay, setOpenPay] = useState({
    btc: false,
    usdt: false,
    bank: false,
  })


  const formik = useFormik({
    initialValues: {
      ...reuseValue,
      wallet: ""
    } ,
    validationSchema: Yup.object({
      ...genaralSchema,
      wallet: Yup.string().required(),
    }),
    onSubmit: (values) => handleWithdrawal(values)
  })

  const formikUsdt = useFormik({
    initialValues: {
      ...reuseValue,
      wallet: "",
      network: ""
    },
    validationSchema: Yup.object({
      ...genaralSchema,
      wallet: Yup.string().required(),
      network: Yup.string().required()
    }),
    onSubmit: (values) => handleWithdrawal(values)
  })

  const formikBank = useFormik({
    initialValues: {
      ...reuseValue,
      amount: null,
      withdrawalMethod: '',
      bankName: "",
      country: "",
      accountNumber: '',
      accountName: "",
      routenNumber: ""
    },
    validationSchema: Yup.object({
      ...genaralSchema,
      accountName: Yup.string().required(),
      bankName: Yup.string().required(),
      accountNumber: Yup.string().required(),
      routenNumber: Yup.string().required(),
      country: Yup.string().required(),
    }),
    onSubmit: (values) => handleWithdrawalBank(values)
  })

  const generalWData = (values:{[key:string]:any}) => ({
    uid: currentUser?.uid,
    idx: Math.random().toString(),
    status: "pending",
    withdrawalAmount: values.amount,
    method: values.withdrawalMethod,
    email: currentUser?.email || "None",
    date: serverTimestamp(),
    currentUserfirstname: currentUser?.firstname,
    currentUserlastname: currentUser?.lastname,
    number: currentUser?.phone,
    network:values.network || "None",
    charge: "0.5",
  })

  const withdrawalCheck = (values:{[key:string]: any}) => {
    if (currentUser?.password !== values.password) return Toast.error.fire({ text: "Incorrect password" })
    if (currentUser?.mainBalance === "0000") return Toast.error.fire({ text: "No balance for withdrawal" })
    if (Number(currentUser?.mainBalance) < 100) return Toast.error.fire({ text: "Low balance for withdrawal" })
    if (currentUser?.accessCode !== values.accessCode) return Toast.error.fire({ text: "Invalid or expired access code. Please contact support for more information" })

    return true
  }

  const handleWithdrawal = async (values: withdrawDataType): Promise<any> => {

    if (currentUser?.password !== values.password) return Toast.error.fire({ text: "Incorrect password" })
    if (currentUser?.mainBalance === "0000") return Toast.error.fire({ text: "No balance for withdrawal" })
    if (Number(currentUser?.mainBalance) < 100) return Toast.error.fire({ text: "Low balance for withdrawal" })
    if (currentUser?.accessCode !== values.accessCode) return Toast.error.fire({ text: "Invalid or expired access code. Please contact support for more information" })
  

    try {
      await addDoc(collection(db, `withdrawals/${currentUser?.uid}/withdrawalDatas`), {
        ...generalWData(values),
        wallet: values.wallet,
        country: currentUser?.country,
        AccountNumber: "None",
      })
      formik.setSubmitting(false)
      formik.resetForm()
      Toast.success.fire({
        text: "Please wait for less then 24 hour for withdrawal verification."
      }).then(() => {
        makeRequestApi.post("/withdrawals", currentUser)
      }).catch((err: any) => {
        Toast.error.fire({
          text: "An error occured while sending you an email"
        })
      })
    } catch (err: any) {
      formik.setSubmitting(false)
      formik.resetForm()
      Toast.error.fire({
        text: err
      })
    }
  }
  const handleWithdrawalBank = async (values: withdrawDataTypeBank) => {

    if (currentUser?.password !== values.password) return Toast.error.fire({ text: "Incorrect password" })
    if (currentUser?.mainBalance === "0000") return Toast.error.fire({ text: "No balance for withdrawal" })
    if (Number(currentUser?.mainBalance) < 100) return Toast.error.fire({ text: "Low balance for withdrawal" })
    if (currentUser?.accessCode !== values.accessCode) return Toast.error.fire({ text: "Invalid or expired access code. Please contact support for more information" })
  
    try {
      await addDoc(collection(db, `withdrawals/${currentUser?.uid}/withdrawalDatas`), {  
        ...generalWData(values),
        wallet: "None",
        country: values.country || currentUser?.country,
        AccountNumber: values.accountNumber,
        
      })

      formikBank.setSubmitting(false)
      formikBank.resetForm()
      Toast.success.fire({
        text: "Please wait for less then 24 hour for withdrawal verification."
      }).then(() => {
        makeRequestApi.post("/withdrawals", currentUser)
      }).catch((err: any) => {
        Toast.error.fire({
          text: "An error occured while sending you an email"
        })
      })
    } catch (err: any) {
      formikBank.setSubmitting(false)
      formikBank.resetForm()
      Toast.error.fire({
        text: err
      })
    }
  }


  const handleOpenPay = (value: string, method?: string, setMethod?: any) => {
    setOpenPay((prev) => ({
      ...prev,
      //@ts-ignore
      [value.toLowerCase()]: !openPay[value]
    }))

    method && setMethod("withdrawalMethod", method)

  }



  return (
    <>
      <AdminNavbar />


      <div className='flex'>

        <Sidebar />


        <Layout>
          <UserHero title='Wihdrawals' />
          <div className=" mt-10 " />
          <div className="min-h-screen bg-sec-bg rounded-lg mb-10  flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-20 main-bg sm:rounded-lg flex justify-center flex-1 sm:flex sm:flex-col lg:flex lg:flex-row">
              <div className="lg:4/5 mx-auto w-full p-6 sm:p-12">
                <div className="mt-12 flex flex-col ">
                  <h1 className="text-3xl xl:text-4xl font-black uppercase text-center text-white">
                    Withdrawal Methods
                  </h1>
                  <h4 className="text-lg mt-4 uppercase text-center text-white">
                    Make your instant withdrawal today with ease <br />
                    Choose your withdrawal method
                  </h4>

                  <section className="w-full space-y-4 mt-2">
                    <div >
                    <Button className='!w-full gradient-btn' onClick={() => handleOpenPay("btc", "Bitcoin", formik.setFieldValue)} title='Bitcoin' icon={<DefaultIcon isSubmitting={false} />} />
                    </div>

                    <Modal

                      open={openPay.btc}
                      onClose={() => handleOpenPay("btc", '')}
                    >
                      <div className="field_form authorize_form p-4 ">
                       
                        <h5 className="text-center text-white font-bold text-xl mb-2">
                          Please Input your withdrawal information
                        </h5>
                        <form className='space-y-4' onSubmit={formik.handleSubmit}>

                            <div>
                            <Input
                              type="number"
                              placeholder="Amount"
                              {...formik.getFieldProps("amount")}
                              error={formik.touched.amount && formik.errors.amount}
                            />
                            </div>
                            <div>
                            <Input
                              type="text"
                              placeholder="Wallet"
                              {...formik.getFieldProps("wallet")}
                              error={formik.touched.wallet && formik.errors.wallet}
                            />
                            </div>
                            <Flex>
                            <Input
                              type="password"
                              error={formik.touched.password && formik.errors.password}
                              placeholder="Password"
                              {...formik.getFieldProps("password")}
                            />
                            <Input
                              type='text'
                              error={formik.touched.accessCode && formik.errors.accessCode}
                              placeholder="Enter access code"
                              title='Withdrawal access code'
                              {...formik.getFieldProps("accessCode")}
                            />
                            </Flex>

                          <div className="form-group col-md-12 text-center animation">
                            <Button className='!w-full gradient-btn' disabled={formik.isSubmitting} type='submit' title='Submit' icon={<DefaultIcon isSubmitting={formik.isSubmitting} />} />
                          </div>
                          <div className="divider small_divider"></div>
                        </form>
                      </div>
                    </Modal>

                    <div >
                      <Button className='!w-full gradient-btn' onClick={() => handleOpenPay("usdt", "Usdt", formikUsdt.setFieldValue)} title='Usd Tether' icon={<DefaultIcon isSubmitting={false} />} />
                    </div>
                  

                    <Modal

                      open={openPay.usdt}
                      onClose={() => handleOpenPay("usdt", '')}
                    >
                      <div className="field_form authorize_form p-4 ">
                       
                        <h5 className="text-center text-white font-bold text-xl mb-2">
                          Please Input your withdrawal information
                        </h5>
                        <form className='space-y-4' onSubmit={formikUsdt.handleSubmit}>

                          <Flex className="form-group col-md-12 animation">
                            <Input
                              type="number"
                              placeholder="Amount"
                              {...formikUsdt.getFieldProps("amount")}
                              error={formikUsdt.touched.amount && formikUsdt.errors.amount}
                            />
                          
                            <Select
                              className='*:bg-sec-bg'
                              error={formikUsdt.touched.network && formikUsdt.errors.network}
                              {...formikUsdt.getFieldProps("network")}
                            >
                              <option value="erc20">ERC20</option>
                              <option value="trc20">TRC20</option>
                              <option value="bep20">BEP20</option>
                              <option value="solana">SOLANA</option>
                              <option value="poligon">POLIGON</option>

                            </Select>
                          

                          </Flex>

                          <Flex>
                          <Input
                              type="text"
                              placeholder="Wallet"
                              {...formikUsdt.getFieldProps("wallet")}

                            />
                            <Input
                              type='text'
                              error={formikUsdt.touched.accessCode && formikUsdt.errors.accessCode}
                              placeholder="Enter access code"
                              title='Withdrawal access code'
                              {...formikUsdt.getFieldProps("accessCode")}
                            />
                          </Flex>
                      
                          
                         
                            <Input
                              type="password"
                              error={formikUsdt.touched.password && formikUsdt.errors.password}
                              placeholder="password"
                              {...formikUsdt.getFieldProps("password")}
                            />

                        
                          <div className="form-group col-md-12 text-center animation">
                            <Button className='!w-full gradient-btn' disabled={formikUsdt.isSubmitting} type='submit' title='Submit' icon={<DefaultIcon isSubmitting={formikUsdt.isSubmitting} />} />
                          </div>
                          <div className="divider small_divider"></div>
                        </form>
                      </div>
                    </Modal>

                    <div >
                      <Button className='!w-full gradient-btn'   onClick={() => handleOpenPay("bank", "Bank", formikBank.setFieldValue)} title='Bank' icon={<DefaultIcon isSubmitting={false} />} />
                    </div>
                    <Modal

                      open={openPay.bank}
                      onClose={() => handleOpenPay("bank", "")}
                    >
                      <div className="field_form authorize_form p-4">
                       
                        <h5 className="text-center text-white font-bold text-xl tex-xl">
                          Input your withdrawal information
                        </h5>
                        <form className='space-y-4' onSubmit={formikBank.handleSubmit}>

                          <Flex >
                            <Input
                              type="number"
                              error={formikBank.touched.amount && formikBank.errors.amount}
                              placeholder="Amount"
                              {...formikBank.getFieldProps("amount")}
                            />
                        
                            <Input
                              type="number"
                              error={formikBank.touched.accountNumber && formikBank.errors.accountNumber}
                              placeholder="Account Number"
                              {...formikBank.getFieldProps("accountNumber")}

                            />
                          </Flex>
                          <Flex >
                            <Input
                              error={formikBank.touched.bankName && formikBank.errors.bankName}
                              placeholder="Bank name"

                              {...formikBank.getFieldProps("bankName")}
                            />
                         
                            <Input
                              error={formikBank.touched.routenNumber && formikBank.errors.routenNumber}
                              placeholder="Routen Number or Equiv"
                              title='Routen number or equivalent'
                              {...formikBank.getFieldProps("routenNumber")}
                            />

                          </Flex>
                          <Flex >
                            <Input
                              error={formikBank.touched.accountName && formikBank.errors.accountName}
                              placeholder="Account Name"
                              {...formikBank.getFieldProps("accountName")}
                            />
                         
                            <Input
                              error={formikBank.touched.country && formikBank.errors.country}
                              placeholder="Country of bank"
                              title='Enter the country where This bank is located'
                              {...formikBank.getFieldProps("country")}
                            />

                          </Flex>
                          <Flex >
                            <Input
                              type='password'
                              error={formikBank.touched.password && formikBank.errors.password}
                              placeholder="Enter your account password"
                              title='Confirm your Global Smart Exchange password'
                              {...formikBank.getFieldProps("password")}
                            />
                           <Input
                              type='text'
                              error={formikBank.touched.accessCode && formikBank.errors.accessCode}
                              placeholder="Enter access code"
                              title='Withdrawal access code'
                              {...formikBank.getFieldProps("accessCode")}
                            />

                          </Flex>
                          <div className="form-group col-md-12 text-center animation">

                            <Button className='!w-full gradient-btn' disabled={formik.isSubmitting} type='submit' title='Submit' icon={<DefaultIcon isSubmitting={formik.isSubmitting} />} />
                          </div>
                          <div className="divider small_divider"></div>
                        </form>
                      </div>
                    </Modal>

                    <div className="divider small_divider"></div>
                  </section>
                </div>
              </div>
              <div className="flex-1 bg-indigo-100 text-center hidden">
                <div className="lg:m-12 xl:m-16 w-full  ">
                  <div>
                    <h4 className="mt-8 text-red-600 text-2xl">
                      39mdPL5NsJky1cZyD7hyjrCA45iHo21Pcd
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </div>
      <FooterUser />
    </>
  )
}

export default page
