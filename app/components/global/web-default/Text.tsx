import React from 'react'

interface TextInterface {
    children:React.ReactNode
    className?: string
}

function Text({children, className}:TextInterface) {
  return (
    <p className={`${className} text-gray-400 text-[18px]`}>{children}</p>
  )
}

export default Text