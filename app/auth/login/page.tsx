"use client"
import React, { useState } from 'react'
import { ImSpinner3 } from "react-icons/im";
import { IoMdLogIn } from "react-icons/io";



import { useFormik } from 'formik';
import * as Yup from "yup"
import Card from '@/app/components/global/web-default/Card';
import H2 from '@/app/components/global/web-default/H2';
import Input from '@/app/components/global/web-default/Input';
import Button from '@/app/components/global/web-default/Buttons';
import Link from 'next/link';
import Text from '@/app/components/global/web-default/Text';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/db/firebaseConfig';
import Toast from '@/utils/Alert';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { create } from '@/utils/createCookie';
import { doc, getDoc } from 'firebase/firestore';

function page() {
  const [showPwd, setShowPwd] = useState(false);
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
      rememberme: false
    },
    validationSchema: Yup.object({
      password: Yup.string().min(5).required("Password is Required"),
      email: Yup.string().email().lowercase().trim().required("Email Field is required"),
      rememberme: Yup.bool().oneOf([true, false]).optional()
    }),
    onSubmit: (values) => {
      handleSubmit(values)
    }
  })

  const handleSubmit = async ({ email, password }: typeof formik.values) => {

    try {
      await signInWithEmailAndPassword(auth, email, password);
      formik.setSubmitting(false)
      const cookieData = JSON.stringify({id:auth.currentUser?.uid as string, isAdmin: false})
      create("auth",cookieData)
      return Toast.success
        .fire({
          icon: "success",
          text: "login Successful",
        })
        .then(() => location.assign("/user/dashboard"));
    } catch (error: any) {
      formik.setSubmitting(false)
      return Toast.error.fire({
        icon: "error",
        text: error.code.split("/")[1],
      });
    }
  }


  return (
    <>
      <section className='min-h-screen w-full py-20 '  >
        <div className='container-width'>

          <div className=' flex justify-center items-center max-h-screen'>
            <Card className='lg:!w-[50%] !w-full !translate-y-0 !p-6 lg:!p-10'>
              <form className='space-y-6' onSubmit={formik.handleSubmit}>
                <H2 className='!text-[25px]'>Login Your Account</H2>
                <div className='space-y-4'>

                  <div className='space-y-4'>
                    <label htmlFor='email' className='text-main-color '>Your Email</label>
                    <Input id="email" type='email' placeholder='Your Email' error={formik.touched.email && formik.errors.email}  {...formik.getFieldProps("email")} className="" />
                  </div>

                  <div className='flex justify-between items-center text-main-color'>
                    <label htmlFor='password'>Your Password</label>
                    {/* <Link href="/auth/forget-password">Forgot Password?</Link> */}
                  </div>
                  <div className='relative'>

                    <span onClick={() => setShowPwd(!showPwd)} className='text-gray-400 absolute right-2 top-3 cursor-pointer'>
                      {showPwd ? <FaRegEyeSlash size={25} /> :
                        <FaRegEye size={25} />}
                    </span>


                    <Input id='password' type={showPwd ? "text" : "password"} placeholder='Your Password' error={formik.touched.password && formik.errors.password}  {...formik.getFieldProps("password")} className="" />
                  </div>

                  <div className="flex justify-between items-center w-full ">


                    <label className="relative text-white gap-2 transition-all ease-linear duration-500 flex justify-center items-center cursor-pointer ">
                      <Input
                        type="checkbox"
                        className=" !w-5 !h-5 !p-2.5 relative peer appearance-none transition-all ease-linear duration-500
                       checked:bg-main-color rounded-md checked:text-white  bg-sec-bg checked:border-0 border border-gray-700"
                        {...formik.getFieldProps("rememberme")}
                      />
                      Remember Me

                      <svg
                        className="absolute  w-4 h-4 left-[3px] pointer-events-none text-white hidden peer-checked:block"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </label>
                    <Text className='!text-[16px] text-white'>
                      New User
                      <Link className='text-main-color ml-2' href="/auth/register">
                        Register
                      </Link>
                    </Text>


                  </div>
                </div>
                <Button className='!w-full !flex justify-center items-start gap-3 bg-main-color !text-center !py-3' title="Sign In" type="submit" disabled={formik.isSubmitting} icon={formik.isSubmitting ? <ImSpinner3 className='animate-spin' size={24} /> : <IoMdLogIn size={24} />} onClick={() => { }} />
              </form>

            </Card>

          </div>
        </div>
      </section>
    </>
  )
}

export default page