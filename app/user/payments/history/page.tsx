"use client"
import AdminNavbar from "@/app/components/user/UserNavbar";
import useCollection from "@/app/components/hooks/UseCollection";
import Sidebar from "@/app/components/user/Sidebar";
import FooterUser from "@/app/components/user/FooterUser";
import TableCard from "@/app/components/user/TableCard";
import { auth } from "@/db/firebaseConfig";
import React from "react";
import UserHero from "@/app/components/user/UserHero";
import Layout from "@/app/components/global/Layout";
import { columns } from "@/utils/tableColData";




function page() {
  const [payments] = useCollection(
    `payments/${auth.currentUser?.uid}/paymentDatas`
  );
  return (
    <>
      <AdminNavbar />

      <div className="flex">
        <Sidebar />

        <div className="w-full">
          <Layout>
            <UserHero title="Payments" />

            <div className=" mt-10 " />
             <TableCard data={payments} cols={columns} />
          </Layout>
        </div>
      </div>
          <FooterUser />
    </>
  );
}

export default page;

