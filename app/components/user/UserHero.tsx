"use client"
import React from 'react'
import {usePathname, useRouter} from "next/navigation"

function UserHero({title}: {title: string}) {
    const router = useRouter()
  return (
    <div className={`my-10 w-full`} >
      <div className='flex justify-between items-center '>
        <h2 className='text-2xl font-bold text-white'>{title}</h2>
        <div>
            <button className='hover:text-main-color text-white' onClick={() => router.back()}>Go Back</button>
            {"/"} <span className='text-white'>/</span> {"/"} <span className='text-main-color'>{title}</span>
        </div>
      </div>
    </div>
  )
}

export default UserHero