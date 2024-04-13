import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface SidebarItemsInterface{
    link: string
    title: string
    icon: React.ReactNode
    onClick?:React.MouseEventHandler<HTMLLIElement>
}

function SidebarItem({icon, link, title, onClick}:SidebarItemsInterface) {
    const pathname = usePathname()
  return (
    <li
    onClick={onClick}
    className={`${pathname.includes(link) &&
      "bg-gradient-to-tr from-main-color to-sec-bg text-white shadow-md"
      } rounded-md mb-2 from-main-color to-sec-bg hover:bg-gradient-to-tl transition-colors text-white ease-linear duration-500`}
  >
    <Link
      href={link}
      className="flex items-center hover:text-white gap-4 text-sm text-white font-light px-4 py-2 rounded-md"
    >
      {icon}
      {title}
    </Link>
  </li>
  )
}

export default SidebarItem