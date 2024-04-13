"use client"
import React, { useState } from 'react'
import Card from '../global/web-default/Card'
import H2 from '../global/web-default/H2'
import Select from '../global/web-default/Select'
import Input from '../global/web-default/Input'
import Button from '../global/web-default/Buttons'
import { useFormik } from 'formik';
import * as Yup from "yup"
import Text from '../global/web-default/Text'
import Toast from '@/utils/Alert'
import DefaultIcon from '../global/DefaultIcon'
import { makePayment } from '@/utils/actions'
import { useAuthStore } from '@/app/store/authStore'


function AddFund() {
  const {currentUser} = useAuthStore()

    const USDT = "hgdjkhjkjshsjhjhshjhsUSDTehjgukjehkje"
    const BTC = "yugdhjkhjkjdghjgajkjksjhdghbdjjjBThjgsjC"

    const [wallet, setWallet] = useState(BTC)

    const formik = useFormik({
        initialValues: {
           amount: "",
           method: "",
           prove: null,
        },
        validationSchema: Yup.object({
            amount: Yup.number().min(10).required(),
            method: Yup.string().required(),
            prove: Yup.mixed().nullable().required(),
        }),
        onSubmit: async (values) => await makePayment(currentUser,values)
      })

      const {handleSubmit, values, touched,errors, isSubmitting, getFieldProps, setFieldValue} = formik

      const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
             if(e.target.value === "usdt"){
                setWallet(USDT)
               return setFieldValue("method", e.target.value)
             }
             setWallet(BTC)
             setFieldValue("method", e.target.value)
            
      }

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

  return (
    <Card className='!w-full !px-2 !pt-4 !translate-y-0'>
        <div className='space-y-4'>
            <H2 className='!text-[18px] !uppercase'>Fund Your Wallet</H2>
            <form className='space-y-3' onSubmit={handleSubmit}>
            <Select className='*:bg-sec-bg' onChange={handleSelect} value={values.method} error={touched.method && errors.method}  >
             <option value="">
                  Choose Method
                </option>
                <option value="bitcoin">
                  Bitcoin
                </option>
                <option value="usdt">
                  Usdt
                </option>
             </Select>
             <Input error={touched.amount && errors.amount} {...getFieldProps("amount")} placeholder='Amount' type='number' className=''  />
             <Input error={touched.prove && errors.prove} title='Upload Proof' onChange={(e) => setFieldValue("prove", e.target.files && e.target.files[0]) } type='file' className=''  />
              <div>
              <Text className='!text-[12px] !border-red-400 border-x border-y-0 rounded-lg py-1 px-2'>Make sure you copy the wallet currently. Make the payment and then upload the prove.<br /> Note: Uploading fake proves might result to account ban. </Text>
              
              <div className="flex w-full pl-1 mt-3 justify-between border items-center rounded-lg border-gray-600">
                 <Text className='!text-[12px] !w-[80%] !mr-2 !text-wrap !text-ellipsis !text-white'>
                     {wallet}
                 </Text>
                 <button type='button' onClick={() =>handleCopyClick(wallet)} className='py-2 px-1 rounded-lg w-[20%] text-white  bg-card-bg'>
                     Copy
                 </button>
              </div>
              </div>
             
             <Button className='!w-full gradient-btn'  type='submit' title='Submit'  icon={<DefaultIcon isSubmitting={isSubmitting} />}  />
            </form>
           
        </div> 
    </Card>
  )
}

export default AddFund