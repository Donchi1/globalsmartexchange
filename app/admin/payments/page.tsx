"use client"
import React from 'react'
import AdminHero from '@/app/components/admin/AdminHero'
import AdminNavbar from '@/app/components/user/UserNavbar'
import FooterAdmin from '@/app/components/user/FooterUser'
import AdminSidebar from '@/app/components/admin/AdminSidebar'
import useCollectionGroup from '@/app/components/hooks/UseCollectionGroup'
import * as Icons from "react-icons/bs"
import moment from 'moment'
import handleStatus from '@/utils/handleStatus'
import { useRouter } from 'next/navigation'
import { deleteDoc, doc, DocumentData } from 'firebase/firestore'
import { db } from '@/db/firebaseConfig'
import Toast from '@/utils/Alert'
import Image from 'next/image'
import { TableCols } from '@/app/components/global/Table'
import TableCard from '@/app/components/user/TableCard'
import Layout from '@/app/components/global/Layout'



function page() {
  
  const [ payments, loading, error ] = useCollectionGroup("paymentDatas");

   const router = useRouter()

   const handleDelete = async (item: DocumentData) => {
    try {
      await deleteDoc(
        doc(db, "payments", item.uid, "paymentDatas", item.id)
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
          field: "idx",
          headerName: "ID",
        },
        {
          field: "firstname",
          headerName: "Name",
          width: 100,
          
        },
        {
          field: "email",
          headerName: "Email",
          width: 160,
          
        },
        {
          field: "dailyIncrement",
          headerName: "DailyIncrement",
          width: 100,
        },
        {
          field: "paymentAmount",
          headerName: "Amount",
          width: 100,
        },
        {
          field: "prove",
          headerName: "Prove",
          width: 150,
          renderCell: (params) => {
            return (
              <div className=" ">
                <a
                  href={params.row?.prove}
                  className="inline-flex items-center gap-4"
                  download
                >
                  <Image
                    height={100}
                    width={100}
                    src={params.row?.prove}
                    alt="pics"
                    className="w-14 rounded-full h-14"
                  />
                </a>
              </div>
            );
          },
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
              <div className='flex items-center gap-2'>
                <button
                  onClick={() =>
                    router.push(`payments/edit/${params.row.uid}/${params.row.id}`)
                  }
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

      <AdminNavbar />

      <div className="flex gap-2 ">
        <AdminSidebar />
        <Layout>
            
        <div className="lg:w-[80%] ml-auto w-full" >
            <AdminHero title="Payments" />
            <div className=" mt-10 " />
            <TableCard
            cols={columns}
            data={payments}
            />
            </div>

           
    </Layout>
    </div>
    <FooterAdmin />
    </>
  )
}

export default page

