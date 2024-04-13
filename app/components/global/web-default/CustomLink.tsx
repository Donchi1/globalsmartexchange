import Link from 'next/link'
import React from 'react'


interface LinkType {
  href: string
  text: string
  color?: string
  className?: string
  
}

function CustomLink({color, href, text, className}: LinkType) {
  return (
    <li >  
    <Link href={href} color={color} className={`${className} transition-color duration-500 ease-linear text-white hover:text-g-ancent-text font-bold text-[16px]`} >{text}</Link> 
    </li>
  )
}

export default CustomLink