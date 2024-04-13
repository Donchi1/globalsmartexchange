"use client"
import * as Icons from "react-icons/md";
import { auth} from "@/db/firebaseConfig";
import { useState } from "react";
import TopSidebar from "../global/TopSidebar";
import { useAppStore } from "@/app/store/appStore";
import { useAuthStore } from "@/app/store/authStore";
import { destroyCookie } from "@/utils/createCookie";
import SidebarItem from "../global/web-default/SidebarItems";

const navItems = [

  {
    link: "/admin/dashboard",
    title: "Dashboard",
     icon: <Icons.MdHome size={20} />
  },
  {
    link: "/admin/profile",
    title: "Profile",
     icon: <Icons.MdPerson size={20} />
  },{
    link: "/admin/users",
    title: "Users",
     icon:  <Icons.MdGroup size={20} />
  },{
    link: "/admin/investments",
    title: "Investments",
     icon: <Icons.MdOutlineSend size={20} />
  },{
    link: "/admin/withdrawals",
    title: "Withdrawals",
     icon: <Icons.MdListAlt size={20} />
  },{
    link: "/admin/transactions",
    title: "Transactions",
     icon: <Icons.MdMonetizationOn size={20} />
  },
  {
    link: "/admin/payments",
    title: "Payments",
     icon: <Icons.MdMoney size={20} />
  },{
    link: "/admin/contacts",
    title: "Contacts",
     icon: <Icons.MdMessage size={20} />
  },{
    link: "/admin/subscribers",
    title: "subscribers",
     icon: <Icons.MdSubscriptions size={20} />
  },
  {
    link: "#",
    title: "logout",
     icon: <Icons.MdLogout size={20} />
  },
]

const  AdminSidebar = ()=> {
  const { currentUser } = useAuthStore();
  const { openSidebar} = useAppStore()

  const [openModal, setOpenModal] = useState({
    transfer: false,
    invest: false
  })

  const handleLogout = async () => {
    await auth.signOut();
    await destroyCookie("auth")
    return window.location.assign("/");
  };

  return (
    <>
      <div
        className={`md:left-0 basis-[22%] z-20 static ${openSidebar ? "block": "hidden lg:block"} 
            h-screen `}
      >
        <div className="h-screen fixed w-1/2 lg:w-[21%]">
          <div
            className={`h-screen sidebar-scroll  flex-row flex-nowrap  bg-sec-bg  z-10 text-white   transition-all duration-300`}
          >
            <div className="flex-col items-stretch min-h-full flex-nowrap px-0 mb-12 ">

              <TopSidebar admin setOpenModal={setOpenModal} currentUser={currentUser} />

              <div className="flex flex-col">
                <hr className="mb-4 min-w-full text-gray-500 "  style={{color: "#6b7280", backgroundColor: "#6b7280"}} />

                <ul className="flex-col min-w-full flex list-none px-6">
                  {
                    navItems.map((each, idx) => (
                      <SidebarItem onClick={() => each.link ==="#"? handleLogout() : {}} key={idx} icon={each.icon} title={each.title} link={each.link} />
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminSidebar