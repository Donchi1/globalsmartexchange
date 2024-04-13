import React from 'react'


interface CardInterface {
   className?: string
   children: React.ReactNode
}

function Card({children, className}:CardInterface ) {

  return (
    <div className={`${className} rounded-lg py-8 px-6 bg-sec-bg w-auto lg:w-[32%]  hover:-translate-y-2 transition-transform duration-500 ease-linear`}>
     {children}
    </div>
  )
}

export default Card