import React, { Dispatch, SetStateAction } from 'react'
import { usePathname } from "next/navigation"
import { FaPaperPlane } from "react-icons/fa";
import Image from "next/image";
import { DocumentData } from "firebase/firestore"
import Button, { IconButton } from './web-default/Buttons';
import Text from './web-default/Text';
import { useRouter } from 'next/navigation';


type TopSidebarType = {
    setOpenModal:Dispatch<SetStateAction<{transfer: boolean;invest: boolean}>>
    currentUser: DocumentData | null | undefined
    admin?:boolean
}

function TopSidebar({ currentUser, setOpenModal, admin}: TopSidebarType) {
  const router = useRouter()


  return (
    <div className=" py-4" >
      <div className="flex justify-center flex-col items-center  gap-2">
        <div className="flex items-center  gap-3 ">
        <Image alt="profile" style={{ width: "70px", height: "70px" }} className="rounded-full" width={100} height={100} src={currentUser?.photo || "/imgs/avater.png"} />

          <div>
            
            <h6 className="text-lg font-[600]">

              <span className="text-sm text-white font-normal">
                {currentUser?.firstname}  {currentUser?.lastname}
              </span>
            </h6>
            <Text className="text-xs  text-gray-400">
              {currentUser?.email}
            </Text>
            <div className="flex gap-4  items-center mt-2">
              {admin ? 
              <IconButton
                type="button"
                onClick={() =>  router.push("/admin/profile") }
                title=""
                icon={<FaPaperPlane />}
                className="py-0"
              > 
              </IconButton>: 
              <>
              <Button
                type="button"
                title="Invest"
                 onClick={() => setOpenModal((prev) => ({...prev, invest: true}))}
                className="!py-2 !text-[12px] !font-normal !rounded-lg hover:bg-gradient-to-tl !bg-gradient-to-tr !from-main-color !to-sec-bg"
              ></Button>

              <IconButton
                type="button"
                onClick={() => setOpenModal((prev) => ({...prev, transfer: true}))}
                title=""
                icon={<FaPaperPlane />}
                className="py-0"
              > 
              </IconButton>
              </>}

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default TopSidebar