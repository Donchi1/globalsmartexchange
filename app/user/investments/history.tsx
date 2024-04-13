import { useAuthStore } from '@/app/store/authStore'
import StatusCard from '@/app/components/global/StatusCard'
import TableCard from '@/app/components/user/TableCard'


export default function page() {
  const { currentUser } = useAuthStore()

  const initialDCheck = () => {
    const initialNumber = Number(currentUser?.initialDeposite)
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
    const initialNumber = Number(currentUser?.totalBalance)
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
  const bonusDCheck = () => {
    const initialNumber = Number(currentUser?.bonus)
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
    <div className=" h-screen footer-bg  ">
      <div className="pb-28 pt-20  px-3 md:px-8">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
            <StatusCard
              icon="money"
              title="Initial Deposit"
              amount={currentUser?.initialDeposite}
              percentage={initialDCheck()}
              percentageIcon={
                initialDCheck() > 50 ? 'arrow_upward' : 'arrow_downward'
              }
              percentageColor={initialDCheck() > 50 ? 'green' : 'red'}
              date="Since last month"
            />
            <StatusCard
              icon="groups"
              title="Total Balance"
              amount={currentUser?.totalBalance}
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
              title="Bonus"
              amount={currentUser?.bonus}
              percentage={bonusDCheck()}
              percentageIcon={
                bonusDCheck() > 50 ? 'arrow_upward' : 'arrow_downward'
              }
              percentageColor={bonusDCheck() > 50 ? 'green' : 'red'}
              date="Since last month"
            />
          </div>
        </div>
      </div>

      <div className="px-3 md:px-8 mb-80 -mt-24">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:px-4 ">
            {/* <TableCard /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

