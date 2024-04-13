import React from 'react'

function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className=" w-full">
    <div className="px-3 md:px-8">
     {children}
    </div> 
    </div>
    
  )
}

export default Layout