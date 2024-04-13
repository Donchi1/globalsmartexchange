
"use client"
import AdminHero from "@/app/components/admin/AdminHero";
import AdminNavbar from "@/app/components/admin/AdminNavbar";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import Layout from "@/app/components/global/Layout";
import FooterAdmin from "@/app/components/admin/FooterAdmin";
import React, { useEffect, useState } from "react";
import * as Icons from "react-icons/bs";
import { useRouter } from "next/navigation";
import { DocumentData, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/db/firebaseConfig";
import Toast from "@/utils/Alert";
import Image from "next/image";
import formatCurrency from "@/utils/converter";
import Link from "next/link";
import { TableCols } from "@/app/components/global/Table";
import TableCard from "@/app/components/user/TableCard";

function Index() {
  const [users, setUsers] = useState<DocumentData[]>([])
  

  useEffect(() => {
    
  
    const unsubscribe = onSnapshot(
     collection(db,"users"),
      (qsnap) => {

        const colData = qsnap.docs.map((each) => ({ ...each.data(), id: each.id }))
    
        setUsers(
          colData
        );
       
      },
      (err) => {
        console.log(err)
      }
    );
    return unsubscribe;
  }, []);

  const navigate = useRouter();

  const handleDelete = async (id: string) => {
    //api call for delete
    try {
      await deleteDoc(doc(db, "users", id));

      Toast.success.fire({
        icon: "success",
        text: "user successfully deleted",
      });
    } catch (err: any) {
      Toast.error.fire({ icon: "error", text: err });
    }
  };
  const columns: TableCols[] = [
    { field: "uid", headerName: "Id", width: 90, renderCell({ row }) {
      return (
        <span>{row.uid.slice(0, 10)}</span>
      )
    },},
    {
      field: "name",
      headerName: "User",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="flex gap-2 items-center  ">
            <Image
              height={100}
              width={100}
              src={params.row.photo}
              alt="pics"
              className="rounded-full size-12 object-cover"
            />
            {params.row.firstname} <br /> {params.row.lastname}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 100,
    },
 
    {
      field: "country",
      headerName: "Country",
      width: 100,
    },
    {
      field: "mainBalance",
      headerName: "TotalB",
      width:100,
      renderCell: (params) => (
        <span>{formatCurrency(params.row.mainBalance || 0)}</span>
      ),
    },
    {
      field: "interestBalance",
      headerName: "InterestB",
      width: 100,
      renderCell: (params) => (
        <span>{formatCurrency(params.row.interestBalance || 0)}</span>
      ),
    },
    {
      field: "initialDeposit",
      headerName: "Deposites",
      width: 100,
      renderCell: (params) => (
        <span>{formatCurrency(params.row.initialDeposit || 0)}</span>
      ),
    },

    {
      field: "status",
      headerName: "status",
      width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="flex gap-2 items-center">
            <button
              onClick={() => navigate.push(`/admin/users/edit/${params.row.uid}`)}
              className=" text-white rounded-full px-2 py-1.5 gradient-btn"
            >
              Edit
            </button>
            <Icons.BsTrash
              onClick={() => handleDelete(params.row.uid)}
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
            <AdminHero title="Users" />
            
          <div className="mb-2">
            <Link className=" p-2 gradient-btn text-white  rounded-md" href="/admin/users/create">Create</Link>
          </div>
            <TableCard
              cols={columns}
              data={users}
             
            />
            </div>
        </Layout>
        </div>

      <FooterAdmin />
    </>
  );
}

export default Index;

Index.defaultProps ={
  needsAuth: true,
  isAdmin: true

}