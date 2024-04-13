"use client"
import React from "react";
import AdminHero from "@/app/components/admin/AdminHero";
import AdminNavbar from "@/app/components/admin/AdminNavbar";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import useCollectionGroup from "@/app/components/hooks/UseCollectionGroup";
import { db } from "@/db/firebaseConfig";
import Toast from "@/utils/Alert";

import { deleteDoc, doc, DocumentData } from "firebase/firestore";
import moment from "moment";
import { useRouter } from "next/navigation";
import * as Icons from "react-icons/bs";

import Image from "next/image";
import FooterAdmin from "@/app/components/user/FooterUser"
import formatCurrency from "@/utils/converter";
import { TableCols } from "@/app/components/global/Table";
import Layout from "@/app/components/global/Layout";
import TableCard from "@/app/components/user/TableCard";
import handleStatus from "@/utils/handleStatus";

function Index() {
  const router = useRouter();
  const [transactions, isLoading, isError] =
    useCollectionGroup("transactionDatas");

  const handleDelete = async (item: DocumentData) => {
    try {
      await deleteDoc(
        doc(db, "transactions", item.uid, "transactionDatas", item.id)
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
      field: "slNo",
      headerName: "ID",
    },
    {
      field: "firstname",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className=" ">
            <a
              href={params.row.photo}
              className="inline-flex items-center gap-4"
              download
            >
              <Image
                height={100}
                width={100}
                src={params.row.photo}
                alt="pics"
                className="w-12 rounded-full h-12"
              />
              {params.row.firstname}
            </a>
          </div>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 100,
      renderCell: (params) => (<span>{formatCurrency(params.row.amount?.replace("$", ""))}</span>)
    },
    {
      field: "type",
      headerName: "Type",
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
          <div className="inline-flex gap-2 items-center">
            <button
              onClick={() =>
                router.push(`transactions/edit/${params.row.uid}/${params.row.id}`)
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

      <div className="flex gap-8">
        <AdminSidebar />

        <Layout>
        <div className=" w-full" >
              <AdminHero title="transactions" />
              <div className=" mt-10 " />
                <TableCard
                  cols={columns}
                  data={transactions}
                />
                </div>
          </Layout>
        </div>
      <FooterAdmin />
    </>
  );
}

export default Index;

Index.defaultProps = {
  needsAuth: true,
  isAdmin: true

}
