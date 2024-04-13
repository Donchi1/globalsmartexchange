"use client"
import React from 'react'
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
import { sendPasswordResetEmail} from 'firebase/auth';
import { auth } from '@/db/firebaseConfig';
import Toast from '@/utils/Alert';
import { MdOutlineLockReset } from 'react-icons/md';

function page() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().lowercase().trim().required("Email Field is required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values)
    }
  })

  const handleSubmit = async ({email}: typeof formik.values) => {
    try {
      //create user on firestore
       await sendPasswordResetEmail(auth, email);
      formik.setSubmitting(false);
      formik.resetForm();
      Toast.success.fire({
        text: "An account reset instructions was sent to your email",
      });
    } catch (err: any) {
      formik.setSubmitting(false);
      formik.resetForm();
      Toast.error.fire({ text: err });
    }
  };

  return (
    <>
      <section className='min-h-screen w-full py-20 '  >
        <div className='container-width'>

          <div className=' flex justify-center items-center'>
            <Card className='lg:!w-[50%] !w-full !translate-y-0 !p-8 lg:!p-10'>
              <form className='space-y-6' onSubmit={formik.handleSubmit}>
                <H2 className='!text-[25px]'>Forgot Password</H2>
                <div className='space-y-4'>

                  <div className='space-y-4'>
                  <label htmlFor='email'  className='text-main-color '>Your Email</label>
                  <Input id="email" type='email' placeholder='Your Email' error={formik.touched.email && formik.errors.email}  {...formik.getFieldProps("email")} className="" />
                  </div>

                  <Text className='!text-[16px] text-white'>
                  Back to
                  <Link className='text-main-color ml-2' href="/auth/login">
                     Login
                    </Link>
                  </Text>
                 
                  
                </div>
                <Button className='!w-full !flex justify-center items-start gap-3 bg-main-color !text-center !py-3'  title="Reset Password" icon={formik.isSubmitting? <ImSpinner3 className='animate-spin' size={24} />:<MdOutlineLockReset size={24} />}  onClick={() => { }} />
              </form>

            </Card>

          </div>
        </div>
      </section>
    </>
  )
}

export default page