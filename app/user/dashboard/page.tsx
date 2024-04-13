"use client"
import ChartBar from "@/app/components/global/ChartBar"
import ChartLine from "@/app/components/global/ChartLine"
import InvestmentStats from "@/app/components/global/InvestmentStats"
import PageVisitsCard from "@/app/components/global/PageVisitsCard"
import StatusCard from "@/app/components/global/StatusCard"
import TrafficCard from "@/app/components/global/TrafficCard"
import { useGetCurrentUser } from "@/app/components/hooks/GetCurrentUser"
import useCollection from "@/app/components/hooks/UseCollection"
import AddFund from "@/app/components/user/AddFund"
import FooterUser from "@/app/components/user/FooterUser"
import Sidebar from "@/app/components/user/Sidebar"
import AdminNavbar from "@/app/components/user/UserNavbar"
import { auth } from "@/db/firebaseConfig"
import { DocumentData } from "firebase/firestore"



export default function page() {



  const [transactions] = useCollection(`transactions/${auth.currentUser?.uid}/transactionDatas`)
  const [payments] = useCollection(`payments/${auth.currentUser?.uid}/paymentDatas`)
  const [investments] = useCollection(`investments/${auth.currentUser?.uid}/investmentDatas`)
  const [currentUser, loading, error] = useGetCurrentUser()


  const initialDCheck = () => {
    const initialNumber = Number(currentUser?.initialDeposit || currentUser?.initialDeposit)
    if (initialNumber === 200) {
      return 10
    }
    if (initialNumber <= 500 && initialNumber > 200) {
      return 50
    }
    if (initialNumber <= 1000 && initialNumber > 500) {
      return 70
    }
    if (initialNumber >= 1000) {
      return 100
    }
    return 0
  }

  const totalDCheck = () => {
    const initialNumber = Number(currentUser?.mainBalance)
    if (initialNumber === 200) {
      return 10
    }
    if (initialNumber <= 500 && initialNumber > 200) {
      return 50
    }
    if (initialNumber <= 1000 && initialNumber > 500) {
      return 70
    }
    if (initialNumber >= 1000) {
      return 100
    }
    return 0
  }
  const interestDCheck = () => {
    const initialNumber = Number(currentUser?.interestBalance)
    if (initialNumber === 200) {
      return 10
    }
    if (initialNumber <= 500 && initialNumber > 200) {
      return 50
    }
    if (initialNumber <= 1000 && initialNumber > 500) {
      return 70
    }
    if (initialNumber >= 1000) {
      return 100
    }
    return 0
  }
  const profitDCheck = () => {
    const initialNumber = Number(currentUser?.profit)
    if (initialNumber === 200) {
      return 10
    }
    if (initialNumber <= 500 && initialNumber > 200) {
      return 50
    }
    if (initialNumber <= 1000 && initialNumber > 500) {
      return 70
    }
    if (initialNumber >= 1000) {
      return 100
    }
    return 0
  }



  return (
    <>
      <AdminNavbar />

      <div className='flex'>

        <Sidebar />

        <div className="footer-bg w-full homepage-3">
          <div className=" px-3 md:px-8 h-20 pt-10 " />

          <div className="px-3 md:px-8">
            <div className=" ">
              <div className="grid grid-cols-1 grid-rows-subgrid lg:grid-cols-2 xl:grid-cols-4 mb-4 text-white">
                <StatusCard
                  icon="money"
                  title="Initial"
                  amount={currentUser?.initialDeposit}
                  percentage={initialDCheck()}
                  percentageIcon={
                    initialDCheck() > 50 ? 'arrow_upward' : 'arrow_downward'
                  }
                  percentageColor={initialDCheck() > 50 ? 'green' : 'red'}
                  date="Since last month"
                />
                <StatusCard
                  icon="storage"
                  title="Balance"
                  amount={currentUser?.mainBalance}
                  percentage={totalDCheck()}
                  percentageIcon={
                    totalDCheck() > 50 ? 'arrow_upward' : 'arrow_downward'
                  }
                  percentageColor={totalDCheck() > 50 ? 'green' : 'red'}
                  date="Since last week"
                />
                <StatusCard
                  icon="paid"
                  title="Profits"
                  amount={currentUser?.profit}
                  percentage={profitDCheck()}
                  percentageIcon={
                    profitDCheck() > 50 ? 'arrow_upward' : 'arrow_downward'
                  }
                  percentageColor={profitDCheck() > 50 ? 'green' : 'red'}
                  date="Since yesterday"
                />
                <StatusCard
                  icon="poll"
                  title="Interest"
                  amount={currentUser?.interestBalance}
                  percentage={interestDCheck()}
                  percentageIcon={
                    interestDCheck() > 50 ? 'arrow_upward' : 'arrow_downward'
                  }
                  percentageColor={interestDCheck() > 50 ? 'green' : 'red'}
                  date="Since last month"
                />
              </div>
            </div>
          </div>

          <div className="px-3 md:px-8 ">
            <div>
              <div className="grid grid-cols-1 xl:grid-cols-3 grid-rows-subgrid">
                <div className=" lg:px-4 mb-14">
                  <ChartLine />
                </div>
                <div className=" lg:px-4 mb-14">
                  <ChartBar />
                </div>
                <div className=" lg:px-4 mb-14">
                  <AddFund />
                </div>
              </div>
            </div>
          </div>
          <div className="px-3 md:px-8 h-auto">
            <div >
              <div className="grid grid-cols-1 xl:grid-cols-5">
                <div className="xl:col-start-1 xl:col-end-4 lg:px-4 mb-10">
                  <PageVisitsCard

                    transactions={transactions}
                  />
                </div>
                <div className="xl:col-start-4 xl:col-end-6 lg:px-4 mb-8">
                  <TrafficCard
                    profile={currentUser as DocumentData}
                    payments={payments}
                    investments={investments}
                    total={totalDCheck()}
                    initial={initialDCheck()}
                    interest={interestDCheck()}
                  />
                </div>
               
              </div>
            </div>
          </div>
          <div className="px-3 md:px-8 lg:px-12 h-auto mb-14">
            <div className=" max-w-full">
              {investments.length > 0 &&
                  <InvestmentStats

                    investments={investments}
                  />
                
              }

            </div>
          </div>
        </div>
      </div>
          <FooterUser />
    </>
  )
}

