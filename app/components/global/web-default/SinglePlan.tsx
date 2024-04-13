import React from 'react'
import Card from './Card'
import { IconButton } from './Buttons'
import { usePathname } from 'next/navigation'
import { useAppStore } from '@/app/store/appStore'
import { auth } from '@/db/firebaseConfig'

interface SinglePlanInterface {
    title: string
    price: string
    total: string
}

function SinglePlan({title, price, total}:SinglePlanInterface) {

  const {handleModal, setInvestAmount} =useAppStore()



const handleInvestClick  = (amount:string) => {
  if(auth.currentUser?.uid ) {
    const amt = amount.split("-")[1].trim().replace("$", "")
    setInvestAmount(amt)
    return  handleModal(true)
  }
  location.assign("/user/login")
}



  return (
    <Card
    className="!flex-1  !relative !w-full "
  >
    <div className="absolute right-0 top-0 h-16 w-16">
      <span className="absolute rotate-45 bg-main-color text-center text-white rounded-br rounded-tl rounded-full  font-semibold py-1 left-[-32px] top-[32px] w-[115px]">
        {title}
      </span>
    </div>
    <h4 className="text-3xl mb-4 font-ubuntu font-[500] text-white">
      {title}
    </h4>

    <h4 className="text-3xl text-main-color font-ubuntu font-[500]">
      {price}
    </h4>
    <div className="mt-2 text-white text-lg font-ubuntu">
      <h6>10% after 5 days</h6>
    </div>
    <hr className="my-8" />

    <p className="text-[500] text-lg text-white">
      Profit For Every Day
    </p>
    <p className="text-[500] text-lg text-white mt-2">
      Capital will back :
      <span className="bg-main-color text-white rounded-lg px-2 py-1 ml-1">
        Yes
      </span>
    </p>

    <p className="text-[500] text-lg text-white mt-2">
      Total {total} DOLLARS +{" "}
      <span className="bg-main-color text-white rounded-lg py-px px-2">
        Capital
      </span>
    </p>
    <div className="mt-8">
    <IconButton className="!text-[15px]" title="Invest Now" onClick={() => handleInvestClick(price)} />
    </div>
   
  
      
  
  </Card>
  )
}

export default SinglePlan