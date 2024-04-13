"use client"
import React, { useState, useRef } from "react";
import * as Icons from "react-icons/hi2";
import * as IconM from "react-icons/md";

import { auth, db, storage } from "@/db/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import Toast from "@/utils/Alert";
import useGetDocument from "../hooks/UseDocument";
import useCollection from "../hooks/UseCollection";
import PreLoader from "@/app/components/global/Preloader";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { useAppStore } from "@/app/store/appStore";
import { destroyCookie } from "@/utils/createCookie";
import Dropdown from "../global/web-default/Dropdown";
import Preloader from "@/app/components/global/Preloader";

export default function AdminNavbar() {

  const { setOpenSidebar } = useAppStore();
  const [actions, setActions] = useState({
    notify: false,
    profile: false
  })



  const noteRefData = `notifications/${auth.currentUser?.uid as string
    }/notificationDatas`;

  const [notifications, loading, error] = useCollection(noteRefData);

  const [userDocument, userLoading, userError] = useGetDocument(
    "users",
    auth.currentUser?.uid as string || "tyutuij",
    { snap: true, user: true}
  );


  const screenRef = useRef<HTMLSpanElement>(null)




  const handleLogout = async () => {
    await auth.signOut();
    await destroyCookie("auth")
    return window.location.assign("/");
  };


  //clear all notifications
  const handleNotificationClear = async () => {
    const docRef = collection(db, noteRefData);
    const data = await getDocs(docRef);
    data.docs.forEach(async (each) => {
      await deleteDoc(doc(docRef, each.id));
    });
  };

  // if (userLoading) {
  //   return <PreLoader />;
  // }

  //   if(!userDocument?.verified || userDocument?.verified === "false"){
  //     router.push("/verify")
  // }

  return (
    <>
     
      <nav className="bg-sec-bg sticky top-0 py-6 px-0 lg:px-2 shadow-lg z-20">
        <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
          <div className="flex justify-between items-center w-full ">
            <div className="flex justify-center items-center">
              <Image className='w-[200px]' src={"/imgs/logo.png"} width={400} height={400} alt='logo' />
              {/* <span>GlobalSartExchange</span> */}
            </div>
            <div className="flex justify-center gap-2 items-center">
              <div>
                <span ref={screenRef} className="cursor-pointer hidden d-lg-inline rounded-xl bg-transparent">
                  <IconM.MdFullscreen size={30} />

                </span>
              </div>
              <Dropdown open={actions.notify} wrapperClassName="!w-72"
                label={<div>
                  {notifications.length > 0 && (
                    <span className="w-4  h-4 flex text-xs justify-center text-white items-center rounded-full absolute bg-main-color">
                      {notifications?.length}
                    </span>
                  )}
                  <Icons.HiBell
                    size={30}
                    className="text-white cursor-pointer "
                    onClick={() => setActions({ ...actions, notify: !actions.notify, profile: false })}
                  />
                </div>}>
                  <div className="block px-4 py-2 font-medium text-center text-white rounded-t-lg bg-card-bg dark:bg-gray-800 dark:text-white">
                    Notifications
                  </div>
                  
                    {notifications?.length > 0 ? notifications.map((each, idx) => (
                      <div key={idx}  className="flex flex-col px-2 py-3  hover:bg-sec-bg dark:hover:bg-gray-700">
                        
                          <p className="text-gray-400 text-sm mb-1.5 dark:text-gray-400">{each.text}</p>
                          <p className="text-xs text-main-color">{moment(each.date?.toDate()).format('lll')}</p>
                        
                      </div>)) : (<div className="flex px-4 py-3 hover:!bg-sec-bg dark:hover:bg-gray-700">
                        
                          <div className="text-red-400 text-sm mb-1.5 dark:text-gray-400">No notification</div>
                        
                      </div>)
                    }

                  <a href="#" className="block py-2 text-sm font-medium text-center text-main-color rounded-b-lg bg-card-bg hover:bg-sec-bg dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                    <div className="inline-flex items-center ">
                      <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                      </svg>
                      View all
                    </div>
                  </a>
               


              </Dropdown>
              <Dropdown open={actions.profile} label={<Image
                onClick={() => setActions({ ...actions, notify: false, profile: !actions.profile })}
                style={{ width: "40px", height: "40px" }}
                width={40}
                height={40}
                src={userDocument?.photo || "/imgs/avater.png"}
                className="rounded-full cursor-pointer "
                alt="profile"
              />}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" >
                  <li>
                    <Link href="user/profile" className="block px-4 text-main-color py-2 hover:bg-sec-bg dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link>
                  </li>
                </ul>
                <div className="py-2" onClick={handleLogout}>
                  <Link href="#" className="block px-4 py-2 text-sm text-main-color hover:bg-sec-bg dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
                </div>
              </Dropdown>
              <div className="lg:hidden block ">
                <button onClick={() => setOpenSidebar()}>
                  <Icons.HiBars3 size={30} color="white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
