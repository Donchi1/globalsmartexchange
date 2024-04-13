import React from "react";
import useCollection from "@/app/components/hooks/UseCollection";
import Layout from "@/app/components/global/Layout";
import Sidebar from "@/app/components/user/Sidebar";
import UserHero from "@/app/components/user/UserHero";
import AdminNavbar from "@/app/components/user/UserNavbar";
import FooterUser from "@/app/components/user/FooterUser";
import { auth } from "@/db/firebaseConfig";
import handleStatus from "@/utils/handleStatus";
import moment from "moment";
import Image from "next/image";
import TableCard from "@/app/components/user/TableCard";
import { DocumentData } from "firebase/firestore";
import { transColumns } from "@/utils/tableColData";

function page() {
  const [transactions] = useCollection(
    `transactions/${auth.currentUser?.uid}/transactionDatas`
  );


  return (
    <>
      <AdminNavbar />

      <div className="flex">
        <Sidebar />

        <div className="w-full">
          <Layout>
            <UserHero title="transactions" />
            <div className=" mt-10 " />

              <TableCard cols={transColumns} data={transactions} />
          </Layout>

        </div>
      </div>
          <FooterUser />
    </>
  );
}

export default page;
