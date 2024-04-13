import React from 'react'

interface H2Interface {
    children:React.ReactNode
    className?: string
}
function H2({children, className}:H2Interface) {
  return (
    <h2 className={`${className} font-bold font-mono text-white text-4xl lg:text-5xl`}>{children}</h2>        
  )
}

export default H2