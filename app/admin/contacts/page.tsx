"use client"
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Icons from "react-icons/bs"
import moment from 'moment';
import * as Yup from "yup"
import { deleteDoc, doc, DocumentData } from 'firebase/firestore';
import { db } from '@/db/firebaseConfig';
import Toast from '@/utils/Alert';
import useCollection from '@/app/components/hooks/UseCollection';
import AdminNavbar from '@/app/components/admin/AdminNavbar';
import AdminSidebar from '@/app/components/admin/AdminSidebar';
import AdminHero from '@/app/components/admin/AdminHero';
import FooterAdmin from '@/app/components/admin/FooterAdmin';
import handleStatus from '@/utils/handleStatus';
import { makeRequestApi } from '@/utils/makeRequest';
import { TableCols } from '@/app/components/global/Table';
import Modal from '@/app/components/global/Modal';
import TableCard from '@/app/components/user/TableCard';
import TextArea from '@/app/components/global/TextArea';
import Input from '@/app/components/global/web-default/Input';
import Button from '@/app/components/global/web-default/Buttons';
import DefaultIcon from '@/app/components/global/DefaultIcon';
import Layout from '@/app/components/global/Layout';




type transType = {
  to: string
  from: string
  message: string
  subject: string
  file: string
  name: string
};



function page() {
  const [contacts, isLoading, isError] =
    useCollection("contacts");

    const [openModal, setOpenModal] = useState(false)



  const formik = useFormik({
    initialValues: {
      to: "",
      message: "",
      subject: "",
      file: "",
      name: ""
    } as transType,

    validationSchema: Yup.object({
      to: Yup.string().required("Receipiant required"),
      message: Yup.string().required("Textbox can't be empty"),
      subject: Yup.string(),
      file: Yup.string(),
      name: Yup.string()
    }),

    onSubmit: (values) => sendMail(values),
  });


  const sendMail = async (val: transType) => {
    try {

      await makeRequestApi.post("/message", val)
      formik.resetForm()
      Toast.success.fire("Email successfully sent")
    } catch (error: any) {
      console.log(error.response.data.message)
    }
  }




  const handleDelete = async (item: DocumentData) => {
    try {
      await deleteDoc(
        doc(db, "contacts", item.id)
      );
      Toast.success.fire({ text: "Document successfully deleted" });
    } catch (error: any) {
      Toast.error.fire({ text: error.code });
    }
    //api call for delete
    // setProductData((prev) => prev.filter((each) => each.id !== id));
  };

  const columns: TableCols[] = [
    {
      field: "uid",
      headerName: "ID",
      width: 90,

    },
    {
      field: "name",
      headerName: "Name",
      width: 200,

    },
    {
      field: "subject",
      headerName: "Subject",
      width: 150,
      renderCell: (params) => <span title={params.row.subject} >{params.row.subject.slice(0, 20)}</span>
    },

    {
      field: "date",
      headerName: "Date",
      renderCell: (params) => <span >{moment(params.row.date.toDate()).format('lll')}</span>,
      width: 130,
    },
    {
      field: "message",
      headerName: "Message",
      width: 120,
      renderCell: (params) => <span title={params.row.message} >{params.row.message.slice(0, 20)}</span>
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => <span >{handleStatus(params.row.status)}</span>,
      width: 100,

    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: ({ row }) => {
        return (
          <div className='flex items-center gap-4'>

            <Icons.BsTrash
              onClick={() => handleDelete(row)}
              size={24}
              className="cursor-pointer text-red-500 ml-4"
            />
            <button type='button' data-bs-toggle="modal"
              data-bs-target="#messageModal"
              onClick={() =>
                (formik.setValues({ ...formik.values, to: row.email, name: row.name }))
              }
            >
              <Icons.BsEnvelope size={24} className='text-light-blue-700 cursor-pointer ' />
            </button>
          </div>
        );
      },
    },
  ];



  return (
    <>
      <Modal open={openModal} title="Message" onClose={() => setOpenModal(false)} className=" " >
        <div
          className="col-lg-8 col-sm-12 col-xs-12 modal-dialog modal-dialog-centered"

        >
          <div className="contact modal-content bg-gray-900">
            <form className="form mt-2 px-2" onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <Input
                    type="text"
                    placeholder="Receipiant"
                    {...formik.getFieldProps("to")}
                  />

                </div>
                <div className=" col-12">
                  <Input
                    type="text"
                    placeholder="Subject"
                    error={formik.touched.subject && formik.errors.subject}
                    {...formik.getFieldProps("subject")}
                  />

                </div>

                <div className="form-group col-md-12">

                  <TextArea
                    
                    rows={8}
                    error={formik.touched.message && formik.errors.message}
                    placeholder="Your Message"
                    {...formik.getFieldProps("message")}
                  ></TextArea>


                </div>
                <div className="col-md-12 text-center mb-4">
                <Button className='!w-full !flex justify-center items-start gap-3 bg-main-color !text-center !py-3' type="submit" disabled={formik.isSubmitting} title="Update" icon={<DefaultIcon isSubmitting={formik.isSubmitting} />} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>



      <AdminNavbar />
     

      <div className='flex overflow-x-hidden gap-2'>



        <AdminSidebar />

        <Layout>
            
            <div className="lg:w-[80%] ml-auto w-full" >

          <AdminHero title="Contacts" />
          <div className=" mt-10 " />
          <TableCard
            cols={columns}
            data={contacts}
          />
        </div>
        </Layout>
        </div>
      <FooterAdmin />
    </>


  )
}

export default page

