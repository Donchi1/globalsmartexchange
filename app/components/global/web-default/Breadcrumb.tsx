"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import H2 from './H2'


function Breadcrumb({notFound}:{notFound?:string}) {
 const pathname = usePathname().split("/")
  return (
    <div className='absolute -bottom-8 bg-sec-bg container-width mx-auto h-[10vh] flex gap-2 justify-center items-center uppercase rounded-lg'>
        <a href="/" className='text-white font-bold text-[18px] hover:text-main-color transition-colors ease-linear duration-300' >Home</a>
        <span className='text-white font-bold text-[17px]'>/</span>
      <H2 className='!text-[18px] !text-main-color'>
        {notFound ? notFound : pathname[pathname.length - 1]}
      </H2>
        
    </div>
  )
}

export default Breadcrumb