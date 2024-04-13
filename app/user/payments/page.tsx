"use client"
import { useFormik } from 'formik'

import React, { useState } from 'react'
import * as Yup from "yup"
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { auth, db, storage } from '@/db/firebaseConfig'

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import Toast from '@/utils/Alert'
import UserHero from '@/app/components/user/UserHero'
import AdminNavbar from '@/app/components/user/UserNavbar'

import Sidebar from '@/app/components/user/Sidebar'
import FooterUser from '@/app/components/user/FooterUser'
import Layout from '@/app/components/global/Layout'
import Image from 'next/image'
import { makeRequestApi } from '@/utils/makeRequest'
import { useAuthStore } from '@/app/store/authStore'
import Select from '@/app/components/global/web-default/Select'
import Input from '@/app/components/global/web-default/Input'
import Button from '@/app/components/global/web-default/Buttons'
import DefaultIcon from '@/app/components/global/DefaultIcon'
import { makePayment } from '@/utils/actions'

type ProveType =  {amount: number | null, method: string, prove: Blob | null}

function page() {
  const [wallet, setSetWallet] = useState({
    btc:"3C6rY9Z3Eeq51riiVB1u6TduHhfTMuySR5",
    usdt:"TFU9WkPcVTq1y44pEY3dCGkgVVxGhGdduH",
    selected:"btc"
  })
  const { currentUser } = useAuthStore();
 const formik = useFormik({
  initialValues: {
    amount: null,
    method: 'BTC',
    prove: null
  } as ProveType,
  validationSchema: Yup.object({
    amount: Yup.number().min(10).required(),
    method: Yup.string().required(),
    prove: Yup.mixed().required()
  }),
  //set the prove to firebase storage and add the payment info to the database.
  onSubmit: async (values) => await makePayment(currentUser,values)  
  })

     // This is the function we wrote earlier
     async function copyTextToClipboard(text:string) {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.execCommand('copy', true, text);
      }
    }
  
    // onClick handler function for the copy button
    const handleCopyClick = (copyText:string) => {
      // Asynchronously call copyTextToClipboard
      copyTextToClipboard(copyText)
        .then(() => {
        
          Toast.success.fire("text coppied")
          
        })
        .catch((err) => {
          console.log(err);
        });
    }


    const {errors, handleSubmit, getFieldProps, touched, setFieldValue, isSubmitting} = formik
    
    const selectedWallet = wallet.selected === "btc" ? wallet.btc : wallet.usdt
    const selectedWalletUrl = wallet.selected === "btc" ? "/assets/img/qrcode.jpg"  : "/assets/img/qrcodeUSDT.jpeg"
  return (
<>
<AdminNavbar/>
     
     <div className='flex'>
     <Sidebar />

  <Layout>
<UserHero title='Payment' />
<div className='flex  justify-center mb-8'>
      <div className=" bg-sec-bg shadow sm:rounded-lg flex justify-center flex-1  flex-wrap">
        <div className="lg:w-1/2 xl:w-5/12 sm:w-full p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-2xl font-black uppercase text-center text-white">
              Payment Methods
            </h1>
            <h4 className="text-sm mt-4 uppercase text-center text-white">
              Invest in our platform today and never regret <br />
            </h4>

            <form className="w-full flex-1 mt-4 " onSubmit={handleSubmit}>
            <div className="form-group col-md-12 ">
            <label className="text-main-color capitalize my-2 block  ">Select Wallet</label>
                <Select
                className='*:bg-sec-bg'
                   onChange={({target}) => {
                    setSetWallet({...wallet, selected:target.value})
                    setFieldValue("method", target.value.toUpperCase())
                   }
                  }
                >
                  <option value="">Choose a wallet</option>
                  <option value="btc">BTC</option>
                  <option value="usdt">USDT</option>
                </Select>
               
              </div>
              <div className="form-group col-md-12 ">
              <label className="text-main-color capitalize my-2 block  ">Amount</label>
                <Input
                  error={touched.amount && errors.amount}
                  type="number"
                  placeholder="Enter Amount"
                   {...getFieldProps("amount")}  
                  
                />
              </div>

              <div className="animation">
                <label className="text-main-color capitalize my-2 block  ">Upload prove</label>
                <Input
                  type="file"
                  title="Upload Prove"
                  error={touched.prove && errors.prove}
                  onChange={(e) => {
                    const newFile = e.target.files && e.target.files[0]
                    setFieldValue("prove", newFile)
                  }}
                />
              </div>
              <div className="mt-4 text-center ">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  title='Submit'
                  icon={<DefaultIcon isSubmitting={isSubmitting} />}
                  className=" !bg-gradient-to-tr !from-main-color !to-sec-bg  !w-full  hover:!bg-gradient-to-tl  "
                >
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center rounded-lg">
          <div className="lg:m-12 xl:m-16 w-80 mx-auto  ">
            <div>
              <div className='mb-2'>
                <h4 className="text-center">
                  Make payment with the below wallet and upload prove.
                </h4>
              </div>
              
              <Image width={300} height={300} src={selectedWalletUrl} alt="code" />
             
            </div>
          </div>
         
          <div className="lg:m-12 xl:m-16 tw-w-full  ">
            <div className='pl-2 bg-sec-bg flex rounded-md items-center justify-between'>
              <h4 className=" text-white text-sm">
              {selectedWallet}
              </h4>
              <button onClick={() => handleCopyClick(selectedWallet)} className='cursor-pointer w-20 rounded-md text-white p-2 gradient-btn'>Copy</button>
            </div>
            {wallet.selected !== "btc" && <p className='text-left text-gray-900'>Network: TRC20</p>}
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

