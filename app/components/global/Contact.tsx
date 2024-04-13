import React from 'react'
import { TfiEmail, TfiLocationPin } from "react-icons/tfi"
import { MdOutlinePhoneInTalk, MdWhatsapp } from "react-icons/md";
import { ImSpinner3 } from "react-icons/im";

import ContentHeader from './web-default/ContentHeader'
import CustomIcon from './web-default/CustomIcon'
import H2 from './web-default/H2'
import Card from './web-default/Card';
import { IconButton } from './web-default/Buttons';
import Input from './web-default/Input';
import TextArea from './TextArea';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { auth, db } from '@/db/firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Toast from '@/utils/Alert';

function Contact() {
    const formik = useFormik({
        initialValues: {
            name: "",
            subject: "",
            message: "",
            email: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name Field Required"),
            subject: Yup.string().optional(),
            message: Yup.string().required("Message Field Is Required"),
            email: Yup.string().email().required("Email Field is required")
        }),
        onSubmit: (values) => handleSubmit(values)
        
    })

    const handleSubmit = async (val: {
        email: string;
        name: string;
        message: string;
        subject: string
      }) => {
       
        
    
        try {
          //create user on firestore
          await addDoc(collection(db, "contacts"), {
            ...val,
            uid: auth.currentUser ? auth.currentUser?.uid : Date.now(),
            status: "success",
            filterDate: new Date().toLocaleDateString(),
            date: serverTimestamp(),
          });
          formik.setSubmitting(false);
          formik.resetForm();
          Toast.success.fire({
            text: "Thanks for contacting us. We will get back to you soon."
          });
        } catch (err) {
          formik.setSubmitting(false);
          formik.resetForm();
          Toast.success.fire({ text: "An error occured" });
        }
      };

    return (
        <section className='min-h-screen w-full py-20 '  >
            <div className='container-width'>
                <ContentHeader text='Contact us for more detailed information, questions or clearifications about our platform or any other related issues.' title="Contact for more informations" caption='Contact Us' />

                <div className='flex flex-col flex-wrap justify-center lg:flex-row lg:items-center items-baseline gap-6'>

                    <a href='mailTo:support@globalsmartexchange.cc' className='flex items-center lg:gap-4 gap-2'>
                        <CustomIcon color={9} className='!bg-main-color !w-12 h-12 ' icon={<TfiEmail size={30} />} />
                        <H2 className='lg:!text-[20px] !text-[16px]'>support@globalsmartexchange.cc</H2>
                    </a>
                    <a href='tel:+156356753567' className='flex items-center lg:gap-4 gap-2'>
                        <CustomIcon color={5} className=' !w-12 h-12 ' icon={<MdOutlinePhoneInTalk size={30} />} />
                        <H2 className='lg:!text-[20px] !text-[16px]'  >+156356753567</H2>
                    </a>
                    <a href='https://wa.me/+156356753567' className='flex items-center lg:gap-4 gap-2'>
                        <CustomIcon color={7} className=' !w-12 h-12 ' icon={<MdWhatsapp size={30} />} />
                        <H2 className='lg:!text-[20px] !text-[16px]'  >+156356753567 </H2>
                    </a>
                    <div className='flex items-center gap-4'>
                        <CustomIcon color={3} className=' !w-12 h-12 ' icon={<TfiLocationPin size={30} />} />
                        <H2 className='lg:!text-[20px] !text-[16px]'>359 E Corona Rd, Tucson, AZ 85756, United States</H2>
                    </div>
                </div>
                <div className='mt-14 flex items-baseline lg:items-center gap-10 flex-col lg:flex-row'>
                    <Card className='lg:!w-[50%] !w-full !translate-y-0 !p-8 lg:!p-10'>
                        <form className='space-y-6' onSubmit={formik.handleSubmit}>
                            <H2 className='!text-[25px]'>Get In Touch</H2>
                            <div className='space-y-4'>
                                <div className='flex flex-col lg:flex-row gap-4 items-center'>
                                    <Input error={formik.touched.name && formik.errors.name} placeholder='Your Name'   {...formik.getFieldProps("name")} className="" />
                                    <Input type='email' placeholder='Your Email' error={formik.touched.email && formik.errors.email}   {...formik.getFieldProps("email")} className="" />
                                </div>
                                <Input placeholder='Subject' error={formik.touched.subject && formik.errors.subject}  {...formik.getFieldProps("subject")} className="" />
                                <TextArea error={formik.touched && formik.errors.message}  rows={4} cols={3} {...formik.getFieldProps("message")} placeholder='Write a message' />

                            </div>
                            <IconButton className='animate-' title='Send Message' type='submit' icon={<CustomIcon className='!text-main-color !size-8 ' icon={!formik.isSubmitting ? <TfiEmail /> : <ImSpinner3 className='animate-spin' />} color={6} />} onClick={() => { }} />
                        </form>

                    </Card>
                    <div className='flex lg:w-[50%] w-full'>
                        <Image className='-mr-[110px] z-20 max-w-full ' width={500} height={500} src="/imgs/contact_3g.png" alt="contact" />
                        <Image className='-ml-[110px] max-w-full' width={500} height={500} src="/imgs/contact_box.png" alt="contact" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact