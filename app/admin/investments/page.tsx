"use client"
import AdminHero from '@/app/components/admin/AdminHero'
import AdminNavbar from '@/app/components/admin/AdminNavbar'
import AdminSidebar from '@/app/components/admin/AdminSidebar'
import useCollectionGroup from '@/app/components/hooks/UseCollectionGroup'
import FooterAdmin from '@/app/components/user/FooterUser'
import { db } from '@/db/firebaseConfig'
import Toast from '@/utils/Alert'

import { deleteDoc, doc, DocumentData, updateDoc } from 'firebase/firestore'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import * as Icons from "react-icons/bs"
import React from 'react'
import Image from 'next/image'
import formatCurrency from '@/utils/converter'
import handleStatus from '@/utils/handleStatus'
import { TableCols } from '@/app/components/global/Table'
import TableCard from '@/app/components/user/TableCard'
import Layout from '@/app/components/global/Layout'

function page() {
  
  const router = useRouter()
  const [investments, isLoading, isError] =
    useCollectionGroup("investmentDatas");

  const handleDelete = async (item: DocumentData) => {
    try {
      await deleteDoc(
        doc(db, "investments", item.uid, "investmentDatas", item.id)
      );
      Toast.success.fire({ text: "Document successfully deleted" });
    } catch (error: any) {
      Toast.error.fire({ text: error.code });
    }
    //api call for delete
    // setProductData((prev) => prev.filter((each) => each.id !== id));
  };


  const columns:TableCols[] = [
    {
      field: "username",
      headerName: "Name",
      width: 150,
      renderCell: (params) => {
        return (
          <span   className="inline-flex items-center gap-2">
          
              <Image
              height={12}
              width={12}
                src={params.row.photo}
                alt="pics"
                className="w-12 rounded-full h-12"
              />
              {params.row.username}
            
          </span>
        );
      },
    },
    {
      field: "investedAmount",
      headerName: "Amount",
      width: 100,
    },
    {
      field: "Profit",
      headerName: "profit",
      width: 150,
      renderCell: (params) => <span>{formatCurrency(params.row?.profit)}</span>
    },

    {
      field: "expectedProfit",
      headerName: "Exp-Profit",
      width: 100,
      renderCell: (params) => <span>{formatCurrency(params.row?.expectedProfit)}</span>
    },
    {
      field: "fixedCharge",
      headerName: "Charges",
      width: 90,
    },
    {
      field: "progress",
      headerName: "Progress",
      width: 100,
    },
    {
      field: "date",
      headerName: "Date",
      renderCell: (params) => <span >{moment(params.row.date.toDate()).format('lll')}</span>,
      width: 130,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => <span>{handleStatus(params.row?.status)}</span>
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className='flex gap-2 items-center'>
            <button
              onClick={() => router.push(`investments/edit/${params.row.uid}/${params.row.id}`)}
              className=" text-white rounded-full px-2 py-1.5 gradient-btn"
            >
              Edit
            </button>
            <Icons.BsTrash
              onClick={() => handleDelete(params.row)}
              size={24}
              className="cursor-pointer text-red-500 ml-4"
            />
          </div>
        );
      },
    },
  ];
  return (
    <>
    <AdminNavbar/>

   
    <div className='flex gap-2 overflow-x-hidden'>
   
    <AdminSidebar />
   
    <Layout>
    <div className="lg:w-[80%] ml-auto w-full" >
    <AdminHero title='Investments' />
      <div className=" mt-10 " />

      <TableCard
      cols={columns}
      data={investments}
      />
    </div>
      
      </Layout>
      </div>
      <FooterAdmin />
      </>
  )
}

export default page

