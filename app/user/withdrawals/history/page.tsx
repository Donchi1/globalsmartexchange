"use client"
import React from "react";
import useCollection from "@/app/components/hooks/UseCollection";
import TableCard from "@/app/components/user/TableCard";
import { auth } from "@/db/firebaseConfig";
import AdminNavbar from "@/app/components/user/UserNavbar";
import FooterUser from "@/app/components/user/FooterUser";
import Sidebar from "@/app/components/user/Sidebar";
import UserHero from "@/app/components/user/UserHero";
import Layout from "@/app/components/global/Layout";
import { columns } from "@/utils/tableColData";

const page = () => {
  const [withdrawals] = useCollection(
    `withdrawals/${auth.currentUser?.uid}/withdrawalDatas`
  );
  return (
    <>
      <AdminNavbar />

      <div className="flex">
        <Sidebar />
        <Layout>
          <UserHero title="Withdrawals" />

          <div className="  mt-10 " />
          <TableCard data={withdrawals} cols={columns} />
        </Layout>
        </div>
      <FooterUser />
    </>
  );
};

export default page;


