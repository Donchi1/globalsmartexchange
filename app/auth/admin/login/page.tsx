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
import { auth } from '@/db/firebaseConfig';
import Toast from '@/utils/Alert';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import useGetDocWithClause from '@/app/components/hooks/UseGetDocWithClause';
import { create } from '@/utils/createCookie';

function page() {
  const [admin] = useGetDocWithClause({colls: "users", q:{path: "isAdmin", condition: "==", value: true}})

  const [showPwd, setShowPwd] = useState(false);

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .trim()
        .required("Email required")
        .lowercase(),
      password: Yup.string()
        .min(5, "password must be greater than 5")
        .max(30, "password must not exceed 30 characters")
        .required("Password required"),
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = async (val: { email: string; password: string }) => {

    formik.setSubmitting(true);
    const { email, password } = val;

    if(email !== admin[0]?.email || password !== admin[0]?.password) return Toast.error.fire({text: "Wrong Credentials"})
    
    try {
      //create user on firestore
      await signInWithEmailAndPassword(auth, email, password);
      const cookieData = JSON.stringify({id:auth.currentUser?.uid as string, isAdmin: true})
      create("auth",cookieData)
      //TODO toast
      formik.setSubmitting(false);
      formik.resetForm();
      Toast.success
        .fire({
          text: "Sign in successful",
        })
        .then(() => location.assign("/admin/dashboard"));
    } catch (err: any) {
      formik.setSubmitting(false);
      formik.resetForm();
     
      const msg = err.code.split("/")[1]
      Toast.error.fire({
        text:msg,
      });
    }
  };



  return (
    <>
      <section className='min-h-screen w-full py-20 '  >
        <div className='container-width'>

          <div className=' flex justify-center items-center max-h-screen'>
            <Card className='lg:!w-[50%] !w-full !translate-y-0 !p-6 lg:!p-10'>
              <form className='space-y-6' onSubmit={formik.handleSubmit}>
                <H2 className='!text-[25px]'>Login Admin Account</H2>
                <div className='space-y-4'>

                  <div className='space-y-4'>
                    <label htmlFor='email' className='text-main-color '>Your Email</label>
                    <Input id="email" type='email' placeholder='Your Email' error={formik.touched.email && formik.errors.email}  {...formik.getFieldProps("email")} className="" />
                  </div>

                  <div className='flex justify-between items-center text-main-color'>
                    <label htmlFor='password'>Your Password</label>
                    <Link href="/auth/forget-password">Forgot Password?</Link>
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