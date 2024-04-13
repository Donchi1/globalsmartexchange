import React from 'react'

interface H1Interface {
  children:React.ReactNode
  className?: string
}
function H1({children, className}:H1Interface) {
  return (
    <div className={`${className} font-[900] font-mono text-white text-5xl lg:text-7xl`}>{children}</div>
  )
}

export default H1