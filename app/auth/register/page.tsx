"use client"
import React, { useState } from 'react'
import { ImSpinner3 } from "react-icons/im";


import { useFormik } from 'formik';
import * as Yup from "yup"
import Card from '@/app/components/global/web-default/Card';
import H2 from '@/app/components/global/web-default/H2';
import Input from '@/app/components/global/web-default/Input';
import Button from '@/app/components/global/web-default/Buttons';

import Link from 'next/link';
import Text from '@/app/components/global/web-default/Text';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, storage } from '@/db/firebaseConfig';
import Toast from '@/utils/Alert';
import { BsPersonPlus } from 'react-icons/bs';
import Flex from '@/app/components/global/web-default/Flex';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { saveToFirestore } from '@/utils/actions';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { useRouter, useSearchParams } from 'next/navigation';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

type formDataType = {
  firstname: string;
  lastname: string;
  country: string;
  state: string;
  occupation: string;
  email: string;
  photo: Blob | null;
  phone: string;
  password: string;
};

function page() {

 //const refCode = useSearchParams().get("refcode")

  const [showPwd, setShowPwd] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
      firstname: "",
      lastname: "",
      photo: null,
      phone: "",
      country: "",
      state: "",
      occupation: ""
    } as formDataType,
    validationSchema: Yup.object({
      password: Yup.string().min(5).required(),
      email: Yup.string().email().lowercase().trim().required(),
      firstname: Yup.string().required(),
      lastname: Yup.string().required(),
      country: Yup.string().required(),
      state: Yup.string().required(),
      photo: Yup.mixed().nullable().required(),
      occupation: Yup.string().required(),
    }),
    onSubmit: (values) => {
      handleSubmit(values)
    }
  })

  const handleSubmit = async (values: typeof formik.values) => {

    try {

      //register User
      const { user } = await createUserWithEmailAndPassword(auth, values.email, values.password);

      //Create a reference for the image 
      const storageRef = ref(storage, `users/${user?.uid}`);

      await uploadBytes(storageRef, values.photo as Blob);
      const url = await getDownloadURL(storageRef);
      //const q = query(collection(db, "users"), where("referrerCode", "==", refCode))

      //const referrer = refCode && (await getDocs(q)).docs[0]?.data()


      try {
        //create user on firestore

        await saveToFirestore(user, values, url)
        formik.resetForm();
        formik.setSubmitting(false);
        Toast.success
          .fire({ text: "Sign up success" })
          .then(() => location.assign("/user/dashboard"));
      } catch (err: any) {
        formik.setSubmitting(false);
        formik.resetForm();
        Toast.error.fire({ text: err.message });
      }
    } catch (err: any) {
      formik.setSubmitting(false);
      formik.resetForm();
      const msg = err.code.split("/")[1];
      Toast.error.fire({ text: msg });
    }
  };

  const { touched, errors, values, getFieldProps, setFieldValue } = formik

  return (
    <>
      <section className='min-h-screen w-full py-20 '  >
        <div className='container-width'>

          <div className=' flex justify-center items-center'>
            <Card className='lg:!w-[50%] !w-full !translate-y-0 !p-8 lg:!p-10'>
              <form className='space-y-6' onSubmit={formik.handleSubmit}>
                <H2 className='!text-[25px]'>Register A New Account</H2>
                <div className='space-y-3'>
                  <Flex className='!w-full'>
                    <div className='space-y-3 w-full'>
                      <label htmlFor='firstname' className='text-main-color '>First Name</label>
                      <Input id='firstname' placeholder='First Name' error={touched.firstname && errors.firstname}  {...getFieldProps("firstname")} className="" />
                    </div>
                    <div className='space-y-3 w-full'>
                      <label htmlFor='lastname' className='text-main-color '>Last Name</label>
                      <Input id='lastname' placeholder='Last Name' error={touched.lastname && errors.lastname}  {...getFieldProps("lastname")} className="" />
                    </div>

                  </Flex>

                  <Flex className='!w-full'>
                    <div className='space-y-3 w-full'>
                      <label htmlFor='country' className='text-main-color'>Country</label>
                      <CountryDropdown
                        id='country'
                        value={values.country}
                        onChange={(val) =>
                          setFieldValue("country", val)
                        }

                        classes={` ${touched.country && errors.country && "border-red-500"} [&_option]:text-gray-400 [&_option]:bg-sec-bg text-white hover:border-main-color p-4 focus:border-main-color transition-colors ease-linear duration-500 outline-none bg-transparent border-gray-700 border rounded-full w-full`}
                      />
                    </div>

                    <div className='space-y-3 w-full'>
                      <label htmlFor='state' className='text-main-color '>State</label>


                      <RegionDropdown
                        id='state'
                        country={values.country}
                        value={values.state}
                        onChange={(val) =>
                          formik.setFieldValue("state", val)
                        }
                        classes={` ${touched.country && errors.country && "border-red-500"} [&_option]:text-gray-400 [&_option]:bg-sec-bg text-white hover:border-main-color p-4 focus:border-main-color transition-colors ease-linear duration-500 outline-none bg-transparent border-gray-700 border rounded-full w-full`}
                      />
                    </div>
                  </Flex>
                  <Flex className='!w-full'>
                    <div className='space-y-3 w-full'>
                      <label htmlFor='occup' className='text-main-color '>Occupation</label>
                      <Input id='occup' placeholder='Occupation' error={touched.occupation && errors.occupation}  {...getFieldProps("occupation")} className="" />
                    </div>

                    <div className='space-y-3 w-full'>
                      <label htmlFor='password' className='text-main-color '>Your Password</label>

                      <div className='relative'>
                        <Input id="password" type={showPwd ? "text" : "password"} placeholder='Your Password' error={touched.password && errors.password}  {...getFieldProps("password")} className="" />
                        <span onClick={() => setShowPwd(!showPwd)} className='text-gray-400 absolute right-2 top-[13px] cursor-pointer'>
                          {showPwd ? <FaRegEyeSlash size={25} /> :
                            <FaRegEye size={25} />}
                        </span>
                      </div>

                    </div>
                  </Flex>

                  <div className='space-y-3'>
                    <label htmlFor='email' className='text-main-color '>Email</label>
                    <Input id="email" placeholder='Email' error={touched.email && errors.email}  {...getFieldProps("email")} className="" />
                  </div>

                  <div className='space-y-3'>
                    <label className='text-main-color '>Photo</label>


                    <Input id='photo' type='file' error={touched.photo && errors.photo} onChange={(e) => setFieldValue("photo", e.target.files && e.target.files[0])} className="" />
                  </div>


                  <div className="flex  items-center w-full ">
                    <Text className='!text-[16px] text-white'>
                      Have Account?
                      <Link className='text-main-color ml-2' href="/auth/login">
                        Login
                      </Link>
                    </Text>


                  </div>
                </div>
                <Button className='!w-full !flex justify-center items-start gap-3 bg-main-color !text-center !py-3' type="submit" disabled={formik.isSubmitting} title="Register" icon={formik.isSubmitting ? <ImSpinner3 className='animate-spin' size={24} /> : <BsPersonPlus size={24} />} onClick={() => { }} />
              </form>

            </Card>

          </div>
        </div>
      </section>
    </>
  )
}

export default page