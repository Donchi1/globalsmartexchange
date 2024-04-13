"use client"
import AdminNavbar from '@/app/components/user/UserNavbar'
import useCollection from '@/app/components/hooks/UseCollection'
import Sidebar from '@/app/components/user/Sidebar'
import FooterUser from '@/app/components/user/FooterUser'
import TableCard from '@/app/components/user/TableCard'
import { auth } from '@/db/firebaseConfig'
import React, { useEffect, useState } from 'react'
import UserHero from '@/app/components/user/UserHero'
import moment from 'moment'
import handleStatus from '@/utils/handleStatus'
import Layout from '@/app/components/global/Layout'
import Card from '@/app/components/global/web-default/Card'
import { TableCol, TableHead } from '@/app/components/global/Table'
import { DocumentData } from 'firebase/firestore'
import { useSort } from '@/app/components/hooks/UseSort'


const tHeadData = [
  "ID",
  "Progress",
  "amount",
  "profit",
  "Charge",
  "ExProfit",
  "Date",
  "Status"
]

function pages() {
   const [updatedData, setUpdatedData] = useState<DocumentData[] | null>([])

  const [investments] = useCollection(`investments/${auth.currentUser?.uid}/investmentDatas`)

  const [setShouldSorte, handleSort] = useSort(investments as DocumentData[], setUpdatedData)

  useEffect(() => {
    setUpdatedData(investments)
  }, [investments])
  
   return (
    <>
    <AdminNavbar/>

   
    <div className='flex'>
   
    <Sidebar />
   
    <Layout>
        <UserHero title='Investments' />
      <div className=" mt-10 " />
      
      <div className="!bg-sec-bg text-white rounded-lg" style={{minHeight: "80vh"}}>
     
     <div>
       <div className="overflow-x-auto">
         <table className="items-center w-full bg-transparent border-collapse">
           <thead>
             <tr className='*:text-main-color  *:!font-bold *:!text-[16px] '>
              {tHeadData.map((each, id) => (
                  <TableHead key={id} onClick={() => {
                    handleSort(each.toLowerCase())
                    setShouldSorte(prev => !prev)
                  }} value={each} />
              ))}
             </tr>
           </thead>
           <tbody>
             {updatedData?.length as number > 0 &&
               updatedData?.map((each) => (
                 <tr key={each.uid}>
                  <TableCol value={each.id.slice(0, 8)} />
                  <TableCol value={each.progress} />
                  <TableCol value={each.investedAmount} />
                  <TableCol value={each.profit} />
                  <TableCol value={each.fixedCharge} />
                  <TableCol value={each.expectedProfit}  />
                  <TableCol value={moment(each.date.toDate()).format('lll')} />
                  <TableCol value={handleStatus(each.status)} />
                  </tr>
               ))}
             {!investments?.length  && (
               <tr>
                 <td
                   colSpan={7}
                   rowSpan={7}
                   className=" text-red-500 uppercase text-center pt-8 text-sm font-bold pb-12"
                 >
                   No investment Yet
                 </td>
               </tr>
             )}
           </tbody>
         </table>
        
       </div>
     </div>
   </div>
    </Layout>

           
   
   </div>

   <FooterUser />
   
   </>
   )
}

export default pages
