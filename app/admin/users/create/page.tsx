"use client"
import React from 'react'
import AdminHero from '@/app/components/admin/AdminHero'
import AdminNavbar from '@/app/components/admin/AdminNavbar'
import AdminSidebar from '@/app/components/admin/AdminSidebar'
import FooterAdmin from '@/app/components/user/FooterUser'
import Layout from '@/app/components/global/Layout'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db, storage } from '@/db/firebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import createNotification from '@/utils/createNotification'
import Toast from '@/utils/Alert'
import Compressor from 'compressorjs'
import Input from '@/app/components/global/web-default/Input'
import Button from '@/app/components/global/web-default/Buttons'
import { ImSpinner3 } from 'react-icons/im'
import { BsPersonPlus } from 'react-icons/bs'
import Flex from '@/app/components/global/web-default/Flex'
import { saveToFirestore } from '@/utils/actions'
import DefaultIcon from '@/app/components/global/DefaultIcon'

type formDataType = {

  firstname: string,
  lastname: string,
  country: string,
  state: string,
  occupation: string,
  email: string,
  photo: Blob | null,
  phone: string,
  password: string,
  password1: string,
}

function page() {

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      country: '',
      state: '',
      occupation: '',
      email: '',
      photo: null,
      phone: '',
      password: '',
      password1: '',
    } as formDataType,

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .trim()
        .required("Email required")
        .lowercase(),
      firstname: Yup.string().lowercase().trim().required("Firstname required"),
      lastname: Yup.string().lowercase().trim().required("Lastname required"),
      occupation: Yup.string()
        .lowercase()
        .trim()
        .required("Occupation required"),
      country: Yup.string().lowercase().trim().required("Country required"),
      state: Yup.string().lowercase().trim().required("State required"),
      password: Yup.string()
        .min(5, "password must be greater than 5")
        .max(30, "password must not exceed 30 characters")
        .required("Password required"),
      password1: Yup.string().required("Reapeat-Password required").oneOf([Yup.ref("password"), ""], "Your password do not match"),
      phone: Yup.string().required("Phone number required"),
      photo: Yup.mixed()
        .nullable()
        .required("Photo required")
    }),

    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = async (val: formDataType) => {
    formik.setSubmitting(true);
    let {
      email,
      password,
      photo,
    } = val;


    try {
      //compress user photo
      new Compressor(photo as Blob, {
        quality: 0.6,
        success: (result) => { photo = result }
      })
      //register User
      const {user} = await createUserWithEmailAndPassword(auth, email, password);


      //Create a unique image name
 
      const storageRef = ref(storage, `users/${user.uid}`);

      await uploadBytes(storageRef, photo as Blob)
      const url = await getDownloadURL(storageRef)

      try {
        //create user on firestore
        saveToFirestore(user, val, url)
        formik.resetForm();
        formik.setSubmitting(false);
        Toast.success
          .fire({ text: "User successfully created" })
      } catch (err: any) {
        formik.setSubmitting(false);
        formik.resetForm();
        Toast.error.fire({ text: err.message });
      }

    } catch (err: any) {
      formik.setSubmitting(false);
      formik.resetForm();
      const msg = err.code.split("/")[1]
      Toast.error.fire({ text: msg });
    }
  }
  return (
    <>

      <AdminNavbar />

      <div className="flex gap-8">
        <AdminSidebar />

            <Layout>
              <AdminHero title="Create" />
              <div className=" mt-10 " />
              <section className="bg-sec-bg rounded-md px-4 py-8">
                <form className="" onSubmit={formik.handleSubmit}>
                  <div className="space-y-4">
                    <Flex className="*:!w-full">


                      <Input
                        error={formik.touched.firstname && formik.errors.firstname}
                        type="text"
                        placeholder="Enter firstname"
                        {...formik.getFieldProps("firstname")}
                      />



                      <Input
                        error={formik.touched.lastname && formik.errors.lastname}
                        type="text"
                        placeholder="Enter lastname"
                        {...formik.getFieldProps("lastname")}
                      />
                    </Flex>


                    <Flex className="*:!w-full">

                      <Input
                        error={formik.touched.email &&
                          formik.errors.email}
                        type="email"
                        placeholder="Enter email"
                        {...formik.getFieldProps("email")}
                      />
                      <Input
                        error={formik.touched.phone &&
                          formik.errors.phone}
                        type="tel"
                        placeholder="Enter number"
                        {...formik.getFieldProps("phone")}
                      />

                    </Flex>


                    <Flex  className="*:!w-full">

                      <Input
                        error={formik.touched.password &&
                          formik.errors.password}
                        type="password"
                        placeholder="Enter password"
                        {...formik.getFieldProps("password")}
                      />


                      <Input
                        error={formik.touched.password1 &&
                          formik.errors.password1}
                        type="password"
                        placeholder="Confirm Password"
                        {...formik.getFieldProps("password1")}
                      />

                    </Flex>

                    <Flex className="*:!w-full">
                      <Input
                        error={formik.touched.country &&
                          formik.errors.country}
                        type="text"
                        placeholder="Enter country"
                        {...formik.getFieldProps("country")}
                      />


                      <Input
                        error={formik.touched.state &&
                          formik.errors.state}
                        type="text"
                        placeholder=" Enter state"
                        {...formik.getFieldProps("state")}
                      />

                    </Flex>



                    <Flex className="*:!w-full" >


                      <Input
                        error={formik.touched.occupation &&
                          formik.errors.occupation}
                        type="text"
                        placeholder="Enter occupation"
                        {...formik.getFieldProps("occupation")}
                      />

                      <Input
                        error={formik.touched.photo &&
                          formik.errors.photo}
                        type="file"
                        placeholder="Your Photo"
                        onChange={(e) => formik.setFieldValue("photo", e.target.files && e.target.files[0])}
                      />
                    </Flex>
                    <div className="col-12">
                      <Button className='!w-full !flex justify-center items-start gap-3 bg-main-color !text-center !py-3' type="submit" disabled={formik.isSubmitting} title="Register" icon={<DefaultIcon isSubmitting={formik.isSubmitting} />} />
                    </div>



                  </div>
                </form>
              </section>
            </Layout>


          </div>
     
      <FooterAdmin />
    </>
  )
}

export default page

