"use client"
import AdminHero from '@/app/components/admin/AdminHero'
import AdminNavbar from '@/app/components/admin/AdminNavbar'
import AdminSidebar from '@/app/components/admin/AdminSidebar'
import useCollection from '@/app/components/hooks/UseCollection'
import FooterAdmin from '@/app/components/admin/FooterAdmin'
import Layout from '@/app/components/global/Layout'
import handleStatus from '@/utils/handleStatus'
import moment from 'moment'
import React from 'react'
import * as Icons from "react-icons/bs"
import { deleteDoc, doc, DocumentData } from 'firebase/firestore'
import Toast from '@/utils/Alert'
import { db } from '@/db/firebaseConfig'
import TableCard from '@/app/components/user/TableCard'
import { TableCols } from '@/app/components/global/Table'



function page() {
  const [newsletters] = useCollection("newsletters")

  console.log(newsletters)


  const handleDelete = async (item: DocumentData) => {
    try {
      await deleteDoc(
        doc(db, "newsletters", item.uid)
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
      field: "id",
      headerName: "ID",
    },
    {
      field: "newsLetter",
      headerName: "Email",
      width: 160,
      
    },
    {
      field: "user",
      headerName: "User",
      width: 100,
    },
    {
      field: "date",
      headerName: "Date",
      renderCell: (params) => (
        <span>{moment(params.row.date.toDate()).format('lll')}</span>
      ),
      width: 130,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params)=> <span>{handleStatus(params.row?.status)}</span>
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            
            <Icons.BsTrash
              onClick={() => handleDelete(params.row)}
              size={24}
              className="cursor-pointer text-red-500 ml-4"
            />
          </>
        );
      },
    },
  ];


  return (
    <>
      <AdminNavbar />


      <div className='flex gap-8'>
        <AdminSidebar />

        <Layout>
       
            <AdminHero title="Subcribers" />
            <div className=" mt-10 " />
            <TableCard data={newsletters} cols={columns}/>         
          
      </Layout>
      </div>
      <FooterAdmin />
    </>
  )
}

export default page
