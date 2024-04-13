"use client"
import StatusCard from '@/app/components/global/StatusCard'
import ChartLine from '@/app/components/global/ChartLine'
import ChartBar from '@/app/components/global/ChartBar'
import PageVisitsCard from '@/app/components/global/PageVisitsCard'
import FooterAdmin from '@/app/components/admin/FooterAdmin'
import AdminSidebar from "@/app/components/admin/AdminSidebar"
import AdminTrafficCard from "@/app/components/admin/AdminTrafficCard"
import AdminNavbar from "@/app/components/admin/AdminNavbar"
import useCollectionGroup from "@/app/components/hooks/UseCollectionGroup"
import AdminStatusCard from "@/app/components/admin/AdminStatusCard"
import UsersCarousel from "@/app/components/admin/UsersCarousel"
import useGetDocWithClause from "@/app/components/hooks/UseGetDocWithClause"

export default function Dashboard() {

  const [transactions] = useCollectionGroup(`transactionDatas`)
  const [payments] = useCollectionGroup(`paymentDatas`)
  const [investments] = useCollectionGroup(`investmentDatas`)
  const [withdrawals] = useCollectionGroup(`withdrawalDatas`)
  const [users] = useGetDocWithClause({ colls: "users", q: { path: "isAdmin", condition: "==", value: false } })

  const filteredTrans = transactions?.splice(0, 5).sort((a, b) => b.date - a.date)



  //handle Users information
  const totalBalance = users?.reduce((acc, init) => acc + Number(init.mainBalance), 0)
  const allDeposits = users?.reduce((acc, init) => acc + Number(init.initialDeposit), 0)
  const allInterests = users?.reduce((acc, init) => acc + Number(init.interestBalance), 0)
  const allProfits = users?.reduce((acc, init) => acc + Number(init.profit), 0)

  //Get all pending withdrawals
  const pendingWithdrawals = withdrawals?.filter(each => each.status === "pending")
  //Get all completed investments & running Investments
  const completedInvestments = investments?.filter(each => each.status === "success")
  const runningInvestments = investments?.filter(each => each.status === "pending")





  const initialDCheck = () => {
    const initialNumber = allDeposits
    if (initialNumber === 1000) {
      return 10
    }
    if (initialNumber <= 1100 && initialNumber > 3000) {
      return 50
    }
    if (initialNumber <= 3100 && initialNumber > 5000) {
      return 70
    }
    if (initialNumber >= 7000) {
      return 100
    }
    return 0
  }

  const totalDCheck = () => {
    const initialNumber = totalBalance
    if (initialNumber === 1000) {
      return 10
    }
    if (initialNumber <= 1100 && initialNumber > 3000) {
      return 50
    }
    if (initialNumber <= 3100 && initialNumber > 5000) {
      return 70
    }
    if (initialNumber >= 7000) {
      return 100
    }
    return 0
  }
  const interestDCheck = () => {
    const initialNumber = allInterests
    if (initialNumber === 1000) {
      return 10
    }
    if (initialNumber <= 1100 && initialNumber > 3000) {
      return 50
    }
    if (initialNumber <= 3100 && initialNumber > 5000) {
      return 70
    }
    if (initialNumber >= 7000) {
      return 100
    }
    return 0
  }
  const profitDCheck = () => {
    const initialNumber = allProfits
    if (initialNumber === 1000) {
      return 10
    }
    if (initialNumber <= 1100 && initialNumber > 3000) {
      return 50
    }
    if (initialNumber <= 3100 && initialNumber > 5000) {
      return 70
    }
    if (initialNumber >= 7000) {
      return 100
    }
    return 0
  }

  const secondStatusCheck = (initialNumber: number) => {

    if (initialNumber === 5) {
      return 10
    }
    if (initialNumber <= 10 && initialNumber > 30) {
      return 50
    }
    if (initialNumber <= 30 && initialNumber > 60) {
      return 70
    }
    if (initialNumber >= 61) {
      return 100
    }
    return 0
  }

  return (
    <>
      <AdminNavbar />

      <div className='flex gap-8'>

        <AdminSidebar />

        <div className="footer-bg w-full homepage-3">
          <div className=" px-3 md:px-8 h-20 pt-10 " />

          <div className="px-3 md:px-8">
            <div className=" ">
              <div className="grid grid-cols-1 grid-rows-subgrid lg:grid-cols-2 xl:grid-cols-4 mb-4 text-white">
                <StatusCard
                  icon="money"
                  title="Initials"
                  amount={allDeposits}
                  percentage={initialDCheck()}
                  percentageIcon={
                    initialDCheck() > 50 ? 'arrow_upward' : 'arrow_downward'
                  }
                  percentageColor={initialDCheck() > 50 ? 'green' : 'red'}
                  date="Last month"
                />
                <StatusCard
                  icon="storage"
                  title="Balances"
                  amount={totalBalance}
                  percentage={totalDCheck()}
                  percentageIcon={
                    totalDCheck() > 50 ? 'arrow_upward' : 'arrow_downward'
                  }
                  percentageColor={totalDCheck() > 50 ? 'green' : 'red'}
                  date="Last week"
                />
                <StatusCard
                  icon="paid"
                  title="Profits"
                  amount={allProfits}
                  percentage={profitDCheck()}
                  percentageIcon={
                    profitDCheck() > 50 ? 'arrow_upward' : 'arrow_downward'
                  }
                  percentageColor={profitDCheck() > 50 ? 'green' : 'red'}
                  date="Yesterday"
                />
                <StatusCard
                  icon="poll"
                  title="Interests"
                  amount={allInterests}
                  percentage={interestDCheck()}
                  percentageIcon={
                    interestDCheck() > 50 ? 'arrow_upward' : 'arrow_downward'
                  }
                  percentageColor={interestDCheck() > 50 ? 'green' : 'red'}
                  date="Last month"
                />
              </div>
            </div>
          </div>

          <div className="px-3 md:px-8 ">
            <div className="">
              <div className="grid grid-cols-1 xl:grid-cols-5">
                <div className="xl:col-start-1 xl:col-end-4 lg:px-4 mb-4">
                  <ChartLine />
                </div>
                <div className="xl:col-start-4 xl:col-end-6 lg:px-4 mb-3">
                  <ChartBar />
                </div>
              </div>
            </div>
          </div>

          <div className="px-3 md:px-8">
            <div className=" ">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4 text-white">
                <AdminStatusCard

                  icon="users"
                  title="All Users"

                  amount={users?.length}
                  percentage={secondStatusCheck(users.length)}
                  percentageIcon={
                    secondStatusCheck(users.length) > 50 ? 'arrow_upward' : 'arrow_downward'
                  }
                  percentageColor={secondStatusCheck(users.length) > 50 ? 'green' : 'red'}
                  date="Since last month"
                />
                <AdminStatusCard

                  icon="rInvestments"
                  title="R-Investments"

                  amount={runningInvestments.length}
                  percentage={secondStatusCheck(runningInvestments.length)}
                  percentageIcon={
                    secondStatusCheck(runningInvestments.length) > 50 ? 'arrow_upward' : 'arrow_downward'
                  }
                  percentageColor={secondStatusCheck(runningInvestments.length) > 50 ? 'green' : 'red'}
                  date="last week"
                />
                <AdminStatusCard

                  icon="cInvestments"
                  title="C-Investments"
                  amount={completedInvestments.length}
                  percentage={secondStatusCheck(completedInvestments.length)}
                  percentageIcon={
                    secondStatusCheck(completedInvestments.length) > 50 ? 'arrow_upward' : 'arrow_downward'
                  }
                  percentageColor={secondStatusCheck(completedInvestments.length) > 50 ? 'green' : 'red'}
                  date="yesterday"
                />
                <AdminStatusCard

                  icon="pendingW"
                  title="P-Withdrawals"
                  amount={pendingWithdrawals.length}
                  percentage={secondStatusCheck(pendingWithdrawals.length)}
                  percentageIcon={
                    secondStatusCheck(pendingWithdrawals.length) > 50 ? 'arrow_upward' : 'arrow_downward'
                  }
                  percentageColor={secondStatusCheck(pendingWithdrawals.length) > 50 ? 'green' : 'red'}
                  date="last month"
                />
              </div>
            </div>
          </div>
          <div className="px-3 md:px-8 h-auto">
            <div className="">
              <div className="grid grid-cols-1 xl:grid-cols-5 ">
                <div className="xl:col-start-1 xl:col-end-4 lg:px-4 mb-12">
                  <PageVisitsCard
                    current="admin"
                    transactions={filteredTrans}
                  />
                </div>
                <div className="xl:col-start-4 xl:col-end-6 lg:px-4 mb-12">
                  <AdminTrafficCard
                    profile={{ allInterests, allDeposits, allProfits, totalBalance }}
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
          <div className="px-3 md:px-8 mb-8 lg:mx-4 mx-0 hidden lg:block">
            <div className="">
              <div className="grid lg:grid-cols-2 xl:grid-cols-4 pt-6 rounded-lg bg-sec-bg">
              <div className="col-start-1 col-end-12 lg:px-2 pt-2 ">
                <UsersCarousel users={users} />
                </div>
                </div>
              </div>
          </div>
          <FooterAdmin />
        </div>
      </div>
    </>
  )
}
