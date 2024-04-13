"use client"
import React from 'react'
import AdminHero from '@/app/components/admin/AdminHero'
import AdminNavbar from '@/app/components/user/UserNavbar'
import FooterAdmin from '@/app/components/admin/FooterAdmin'
import Layout from '@/app/components/global/Layout'
import AdminSidebar from '@/app/components/admin/AdminSidebar'
import useCollectionGroup from '@/app/components/hooks/UseCollectionGroup'
import * as Icons from "react-icons/bs"
import moment from 'moment'
import handleStatus from '@/utils/handleStatus'
import { useRouter } from 'next/navigation'
import { deleteDoc, doc, DocumentData } from 'firebase/firestore'
import { db } from '@/db/firebaseConfig'
import Toast from '@/utils/Alert'
import { TableCols } from '@/app/components/global/Table'
import TableCard from '@/app/components/user/TableCard'




function Withdrawals() {

  const [withdrawals, loading, error] = useCollectionGroup("withdrawalDatas");
  const router = useRouter()

  const handleDelete = async (item: DocumentData) => {
    try {
      await deleteDoc(
        doc(db, "withdrawals", item.uid, "withdrawalDatas", item.id)
      );
      Toast.success.fire({ text: "Document successfully deleted" });
    } catch (error: any) {
      Toast.error.fire({ text: error.code });
    }
    //api call for delete
    // setProductData((prev) => prev.filter((each) => each.id !== id));
  };

  // useEffect(() => {
  //  const gg = async () => {
  //   const res = await getDocs(collectionGroup(db, `withdrawalDatas`))
  //   const resW = await getDocs(collection(db, `withdrawals`))
  //   res.docs.map(async each =>{ 
  //    await setDoc(doc(db,`withdrawals/${each.ref.parent.parent?.id}/withdrawalDatas/${each.id}`), {
  //       status:each.data().statusPending && "pending",
  //       charge: 0.5
  //    }, {merge: true}) 
  //   })
  //  res.docs.map(async each => {
  //     // await setDoc(doc(db, ``))
  //  })
  //  }
  //  gg()
  // }, [])


  const columns: TableCols[] = [
    {
      field: "idx",
      headerName: "ID",
    },
    {
      field: "currentUserfirstname",
      headerName: "Name",
      width: 100,

    },
    {
      field: "email",
      headerName: "Email",
      width: 150,

    },
    {
      field: "withdrawalAmount",
      headerName: "Amount",
      width: 100,
    },
    {
      field: "method",
      headerName: "Method",
      width: 100,
    },

    {
      field: "charge",
      headerName: "Charge",
      width: 90,
    },
    {
      field: "AccountNumber",
      headerName: "Account No",
      width: 100,
      renderCell: (params) => (
        <span>{params.row.accountNumber || params.row.AccountNumber}</span>
      ),
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
      renderCell: (params) => <span>{handleStatus(params.row?.status)}</span>
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className='inline-flex gap-2 items-center'>
            <button
              onClick={() =>
                router.push(`withdrawals/edit/${params.row.uid}/${params.row.id}`)
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

      <div className="flex gap-2 overflow-x-hidden">
        <AdminSidebar />

        <Layout>
        <div className="lg:w-[80%] ml-auto w-full" >
          <AdminHero title="Withdrawals" />
          <div className=" mt-10 " />
          <TableCard
            cols={columns}
            data={withdrawals}
          />
        </div>

        </Layout>
      </div>
      <FooterAdmin />
    </>
  )
}

export default Withdrawals
Withdrawals.defaultProps = {
  needsAuth: true,
  isAdmin: true

}
