"use client"
import React, { useState } from 'react'
import Button from './web-default/Buttons'
import Image from 'next/image'
import { FaBars, FaArrowRightLong, FaX } from 'react-icons/fa6'
import Link from 'next/link'
import Dropdown from './web-default/Dropdown'
import useGetDocument from '../hooks/UseDocument'
import { auth } from '@/db/firebaseConfig'
import { destroyCookie } from '@/utils/createCookie'


const navLinks = [
  { text: "Home", link: "/", icon: <span className='lg:hidden block text-white'><FaArrowRightLong /></span> },
  { text: "About", link: "/main/about", icon: <span className='lg:hidden block text-white'><FaArrowRightLong /></span> },
  { text: "Services", link: "/main/services", icon: <span className='lg:hidden block text-white'><FaArrowRightLong /></span> },
  { text: "Contact", link: "/main/contact", icon: <span className='lg:hidden block text-white'><FaArrowRightLong /></span> },
  { text: "Pricing", link: "/main/pricing", icon: <span className='lg:hidden block text-white'><FaArrowRightLong /></span> },
]


function Navbar() {
  const [userDocument, userLoading, userError] = useGetDocument(
    "users",
    auth.currentUser?.uid as string || "tyutuij",
    { snap: true, user: true}
  );

  const [openNav, setOpenNav] = useState(false)

  const [actions, setActions] = useState({
    notify: false,
    profile: false
  })

  const handleLogout = async () => {
    await auth.signOut();
    await destroyCookie("auth")
    return window.location.assign("/");
  };

  return (
    <nav className='w-full h-[12vh] bg-card-bg sticky top-0 z-50 '>
      <section className='relative'>
        <div className='container-width h-[12vh] mx-auto flex justify-between items-center  '>
          <div>
            <Image className='w-[200px]' src={"/imgs/logo.png"} width={400} height={400} alt='logo' />
          </div>
          <div className='flex items-center gap-10'>
          <div className={`lg:static absolute right-0 left-0  ${ openNav ? "top-[4.5rem] transition-all ease-linear duration-700" : "-top-[30rem]"} lg:bg-transparent bg-card-bg w-full lg:w-auto py-4 lg:py-0`}>
            <ul className=' lg:flex-row flex flex-col gap-8 items-start lg:items-center lg:w-auto w-[95%] mx-auto '>
              {navLinks.map(({ icon, link, text }) => (

                <Link className='w-full transition-color lg:border-0 duration-500 ease-linear hover:border-white text-white hover:text-g-ancent-text font-bold text-[16px] flex justify-between items-center border border-main-color rounded-full p-2' href={link}>     
                    {text} 
                    {icon as any}
                </Link>

              ))}
              {!userDocument &&
              <li>
                <Button title='login' className="!bg-g-ancent-text !px-4 " onClick={() => location.assign("/auth/login")} />
              </li>}
              
            </ul>
          
          </div>
          <div className='flex gap-x-4 items-center '>
            {userDocument && 
          <Dropdown wrapperClassName='!top-14'  open={actions.profile} label={<Image
                onClick={() => setActions({ ...actions, notify: false, profile: !actions.profile })}
                style={{ width: "30px", height: "30px" }}
                width={40}
                height={40}
                src={userDocument?.photo || "/imgs/avater.png"}
                className="rounded-full cursor-pointer "
                alt="profile"
              />}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" >
                  <li>
                    <Link href={`${userDocument?.isAdmin ? "/admin/dashboard" : "/user/dashboard"}`} className="block px-4 text-main-color py-2 hover:bg-sec-bg dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                  </li>
                </ul>
                <div className="py-2" onClick={handleLogout}>
                  <Link href="#" className="block px-4 py-2 text-sm text-main-color hover:bg-sec-bg dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
                </div>
              </Dropdown>}
          <button onClick={() => setOpenNav(prev => !prev)} className='lg:hidden block'>
            <div className='flex flex-col *:bg-white *:w-[32px] *:h-1 gap-[5px] *:transition-transform *:ease-linear *:duration-300'>
            <div className={openNav? "rotate-45": "rotate-0"}></div>
            <div className={openNav ? "hidden": "block"}></div>
            <div className={openNav ? "-rotate-45 -translate-y-2" : "-rotate-0 -translate-y-0"}></div>
            </div>
            
          </button>
          </div>
          </div>
         
         

        </div>
      </section>

    </nav>
  )
}

export default Navbar