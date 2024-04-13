import React, { useEffect, useState } from 'react'
import * as Yup from "yup"

import { useFormik } from 'formik'
import { auth, db } from '@/db/firebaseConfig'
import { doc, DocumentData, updateDoc } from 'firebase/firestore'
import Toast from '@/utils/Alert'
import createNotification from '@/utils/createNotification'
import { updatePassword, User } from 'firebase/auth'
import Input from './web-default/Input'
import Button from './web-default/Buttons'
import { ImSpinner3 } from 'react-icons/im'
import TextArea from './TextArea'
import Flex from './web-default/Flex'


type userUpdateType = {
  email: string,
  firstname: string,
  lastname: string,
  occupation: string,
  phone: string,
  state: string,
  country: string,
  address: string,
  aboutMe: string,
  postalCode: string,
  city: string
}
type userUpdatePassType = {
  currentPassword: string,
  password1: string,
  password2: string,
}

export default function SettingsForm({ user }: { user: DocumentData | null | undefined }) {


  const [tabs, setTabs] = useState({
    password: false,
    user: true,
  });



  const formikPass = useFormik({
    initialValues: {
      currentPassword: "",
      password1: "",
      password2: "",
    } as userUpdatePassType,
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .min(5, "password must be greater than 5")
        .max(30, "password must not exceed 30 characters")
        .required("Password required"),
      password1: Yup.string()
        .min(5, "password must be greater than 5")
        .max(30, "password must not exceed 30 characters")
        .required("Password required"),
      password2: Yup.string()
        .required()
        .oneOf([Yup.ref("password1"), ""], "Your password do not match"),
    }),
    onSubmit: (val) => handleSubmitPassword(val),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      occupation: "",
      phone: "",
      state: "",
      country: "",
      address: "",
      aboutMe: "",
      postalCode: "",
      city: ""
    } as userUpdateType,

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .trim()
        .lowercase(),
      firstname: Yup.string().lowercase().trim().required("Firstname required"),
      lastname: Yup.string().lowercase().trim().required("Lastname required"),
      occupation: Yup.string()
        .lowercase()
        .trim()
        .required("Occupation required"),
      country: Yup.string().lowercase().trim().required("Country required"),
      address: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      aboutMe: Yup.string(),
      postalCode: Yup.string(),
      phone: Yup.string().required("Phone number required"),
    }),

    onSubmit: (values) => handleSubmit(values)
  });


  useEffect(() => {
    formik.setValues({
      firstname: user?.firstname,
      lastname: user?.lastname,
      occupation: user?.occupation,
      aboutMe: user?.aboutMe,
      state: user?.state,
      country: user?.country,
      email: user?.email,
      phone: user?.phone,
      postalCode: user?.postalCode,
      city: user?.city,
      address: user?.address,
    })

  }, [user])







  const handleSubmit = async (value: userUpdateType) => {


    const { firstname,
      lastname,
      occupation,
      phone,
      country,
      aboutMe,
      city,
      postalCode,
      state,
      address } = value
    formik.setSubmitting(true);

    try {
      //update user info on firestore

      await updateDoc(doc(db, "users", auth.currentUser?.uid as string), {
        firstname,
        lastname,
        occupation,
        phone,
        country,
        address,
        aboutMe,
        state,
        postalCode,
        city
      });
      await createNotification({
        text: "Profile successfully updated",
        title: "Profile Update",
      });
      formik.setSubmitting(false);
      Toast.success.fire({ text: "update success" });
    } catch (err: any) {
      formik.setSubmitting(false);
      Toast.error.fire({ text: err.message });
    }

  }



  const handleSubmitPassword = async (val: userUpdatePassType) => {
    formikPass.setSubmitting(true);

    if (user?.password === val.currentPassword) {

      try {

        await updatePassword(auth.currentUser as User, val.password1);
        await createNotification({
          text: "Password successfully updated",
          title: "Password Update",
        });
        formikPass.resetForm();
        formikPass.setSubmitting(false);
        Toast.success.fire({ text: "password successfully updated" });
      } catch (err: any) {
        formikPass.setSubmitting(false);
        formikPass.resetForm();
        const msg = err.code.split("/")[1]
        Toast.error.fire({ text: msg });
      }
    } else {
      formikPass.setSubmitting(false);
      Toast.error.fire({ text: "Old password did not match" });
    }

  };

  const { errors, touched, getFieldProps, setFieldValue, values } = formik




  return (
    <div className="bg-sec-bg p-4 rounded-lg">

      <div>
        <form onSubmit={formik.handleSubmit}>
          <h6 className="text-main-color text-xl mt-3 mb-3 font-light uppercase">
            User Information
          </h6>
          <div className="space-y-5">

            <Flex className="font-light">
              <Input
                className=""
                type="tel"
                error={touched.phone && errors.phone}
                placeholder="Phone"
                {...formik.getFieldProps("phone")}
              />
            
              <Input
                className=""
                type="email"
                error={touched.email && errors.email}
                placeholder="Email Address"
                disabled
                {...formik.getFieldProps("email")}
              />
            </Flex>
            <Flex className="font-light">
              <Input
                type="text"
                error={touched.firstname && errors.firstname}
                className=""
                placeholder="FirstName"
                {...formik.getFieldProps("firstname")}
              />
       
              <Input
                className=""
                type="text"
                error={touched.lastname && errors.lastname}
                placeholder="LastName"
                {...formik.getFieldProps("lastname")}
              />
            </Flex>
          </div>

          <h6 className="text-main-color text-xl mb-3 mt-2 font-light uppercase">
            Contact Information
          </h6>
          <div className="space-y-5">
            <Flex className="font-light">
              <Input
                className=""
                type="text"
                error={touched.address && errors.address}
                placeholder="Address"
                {...formik.getFieldProps("address")}
              />

  
              <Input
                className=""
                type="text"
                error={touched.city && errors.city}
                placeholder="City"
                {...formik.getFieldProps("city")}
              />
            </Flex>
            <Flex className=" font-light">
              <Input
                className=""
                type="text"
                error={touched.country && errors.country}
                placeholder="Country"
                {...formik.getFieldProps("country")}
              />
           
              <Input
                className=""
                type="text"
                error={touched.state && errors.state}
                placeholder="State"
                {...formik.getFieldProps("state")}
              />
            </Flex>
            <Flex className="font-light">
              <Input
                type="text"
                className=""
                error={touched.occupation && errors.occupation}
                placeholder="Occupation"
                {...formik.getFieldProps("occupation")}
              />
          
              <Input
                type="text"
                error={touched.postalCode && errors.postalCode}
                className=""
                placeholder="Postal Code"
                {...formik.getFieldProps("postalCode")}
              />
              {formik.touched.postalCode &&
                formik.errors.postalCode ? (
                <div className="text-main-color mb-2 mt-2">
                  {formik.errors.postalCode}
                </div>
              ) : null}
            </Flex>
          </div>

          <h6 className="text-main-color text-xl mt-4 font-light uppercase">
            About Me
          </h6>
          <div className="mt-4 mb-6 font-light">
            <div className="col-12">
              <TextArea
                placeholder="About Me"
                className=""
                cols={5}
                rows={5}
                {...formik.getFieldProps("aboutMe")}
              />

            </div>
          </div>
          <div className="flex flex-wrap  font-light">
            <Button className='!w-full hover:!bg-gradient-to-tl !bg-gradient-to-tr !from-main-color !to-sec-bg' type='submit' title='Update' icon={formikPass.isSubmitting ? <ImSpinner3 className='text-white' /> : <span className="text-white">₿</span>} />
          </div>
        </form>
        <form onSubmit={formikPass.handleSubmit}>
          <h6 className="text-main-color text-xl my-6 font-light uppercase">
            Password
          </h6>
          <div className="space-y-5">
            <Flex className="font-light">

              <Input
                className=""
                type="password"
                error={formikPass.touched.currentPassword && formikPass.errors.currentPassword}
                placeholder="Current password"
                {...formikPass.getFieldProps("currentPassword")}
              />
           
              <Input
                type="password"
                error={formikPass.touched.password1 && formikPass.errors.password1}
                className=""
                placeholder="New Password"
                {...formikPass.getFieldProps("password1")}
              />
              </Flex>
              <Input
                type="password"
                error={formikPass.touched.password2 && formikPass.errors.password2}
                className=""
                placeholder="Repeat Password"
                {...formikPass.getFieldProps("password2")}
              />

           
            <div className="font-light">
              <Button className='!w-full hover:!bg-gradient-to-tl !bg-gradient-to-tr !from-main-color !to-sec-bg' type='submit' title='Update' icon={formikPass.isSubmitting ? <ImSpinner3 className='text-white' /> : <span className="text-white">₿</span>} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
