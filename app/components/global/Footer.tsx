import Image from 'next/image'
import React from 'react'
import Text from './web-default/Text'
import * as Icons from "react-icons/fa6"
import Link from 'next/link'
import H2 from './web-default/H2'
import Input from './web-default/Input'
import { useFormik } from 'formik';
import * as Yup from "yup"
import CustomIcon from './web-default/CustomIcon'
import { BsSend } from "react-icons/bs";
import { ImSpinner3 } from 'react-icons/im'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/db/firebaseConfig'
import Toast from '@/utils/Alert'
import { useAuthStore } from '@/app/store/authStore'


const navLinks = [
  { text: "Home", link: "/", icon: <span className=' text-gray-400'><Icons.FaArrowRightLong /></span> },
  { text: "About", link: "/about", icon: <span className=' text-gray-400'><Icons.FaArrowRightLong /></span> },
  { text: "Services", link: "/services", icon: <span className=' text-gray-400'><Icons.FaArrowRightLong /></span> },
  { text: "Contact", link: "/contact", icon: <span className=' text-gray-400'><Icons.FaArrowRightLong /></span> },
  { text: "Pricing", link: "/pricing", icon: <span className=' text-gray-400'><Icons.FaArrowRightLong /></span> },
]

function Footer() {

  const { currentUser } = useAuthStore()

  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .trim()
        .required("Email required")
        .lowercase(),
    }),
    onSubmit: (values) => handleSubmitSub(values),
  });

  const handleSubmitSub = async (val: { email: string }) => {
    formik.setSubmitting(true);
    const { email } = val;

    try {
      //await makeRequestApi.post("/newsletter", val)
      await addDoc(collection(db, "newsletters"), {
        newsLetter: email,
        uid: auth.currentUser ? auth.currentUser?.uid : Date.now(),
        status: "success",
        date: serverTimestamp(),
        user: currentUser ? currentUser?.firstname : "Guest User"
      });
      formik.setSubmitting(false);
      formik.resetForm();
      Toast.success.fire({
        text: "Thanks for subscribing for our newsletter.",
      });
    } catch (err) {
      formik.setSubmitting(false);
      formik.resetForm();
      Toast.success.fire({ text: "An error occured you can check your email address" });
    }
  };


  return (
    <footer className=" min-h-[80vh] bg-sec-bg pt-6">
      <section className='container-width  '>
        <div className='flex justify-between gap-10 lg:gap-32 flex-col lg:flex-row min-h-[60vh]'>
          <div className='space-y-5 flex-1'>

            <Image className='w-[200px]' src={"/imgs/logo.png"} width={400} height={400} alt='logo' />
            <div className='space-y-2'>
              <Text>
                All you need for your rapid fund boosting,
              </Text>
              <Text>
                savings and investment made available.
              </Text>
            </div>

            <div className='flex  *:transition-all *:ease-linear *:duration-500 items-center gap-5 text-white *:cursor-pointer '>
              <div className='size-[50px] flex justify-center items-center rounded-full bg-[rgb(2,7,36)] text-white hover:ring-1 hover:ring-main-color'>
                <Icons.FaFacebookF />
              </div>
              <div className='size-[50px] flex justify-center items-center rounded-full bg-[rgb(2,7,36)] text-white hover:ring-1 hover:ring-main-color'>
                <Icons.FaTwitter />
              </div>
              <div className='size-[50px] flex justify-center items-center rounded-full bg-[rgb(2,7,36)] text-white hover:ring-1 hover:ring-main-color'>
                <Icons.FaInstagram />
              </div>
              <div className='size-[50px] flex justify-center items-center rounded-full bg-[rgb(2,7,36)] text-white hover:ring-1 hover:ring-main-color'>
                <Icons.FaLinkedinIn />
              </div>
            </div>
          </div>
          <div className='flex-[.5]'>
            <H2 className='!text-[20px] py-6'>Useful Links</H2>
            <ul className='flex flex-col gap-2 '>
              {navLinks.map(({ icon, link, text }) => (

                <Link className=' transition-color  duration-500 ease-linear hover:border-white text-gray-400 hover:text-g-ancent-text font-bold text-[16px] flex justify-between items-center  ' href={link}>
                  {text}
                  {icon as any}
                </Link>

              ))}
            </ul>
          </div>
          <div className='flex-1 space-y-5'>
            <H2 className='!text-[20px] pt-6'>News Letter</H2>
            <Text>Why don't you subscribe to our newsletter for more relevant information on our platform</Text>
            <form onSubmit={formik.handleSubmit}>
              <div className={`${formik.touched.email && formik.errors.email? "focus-within:shadow-red-300": "focus-within:shadow-main-color" } text-white relative flex w-full items-center focus-within:shadow-[0px_1px_10px_-1px_#00000024]  transition-colors ease-linear duration-500 outline-none bg-transparent border-gray-700 border rounded-full`}>
                <Input className='!border-none !border-0' type='email'  {...formik.getFieldProps("email")} placeholder='Enter Email' />
                <button type='submit' className=' absolute right-0'>
                  <CustomIcon icon={formik.isSubmitting ? <ImSpinner3 size={25} className='animate-spin' /> : <BsSend size={25} />} className='size-[52px]' color={8} />
                </button>
              </div>

            </form>
          </div>
        </div>

        <div className='border-t border-x-0 border-b-0 w-full h-2 my-6'></div>
        <div className='flex justify-center flex-col lg:flex-row gap-y-4 lg:gap-y-0 lg:justify-between items-center '>
          <Text className='!text-[18px] !text-white [&_a]:text-main-color'>
            {new Date().getFullYear()} @ copywrite <a href='https://globalsmartexchange.cc' >Global Smart Exchange</a> All right Reserved
          </Text>
          <Image width={300} height={300} src="/imgs/paypal.png" alt="payments" />
        </div>
      </section>

    </footer>
  )
}

export default Footer