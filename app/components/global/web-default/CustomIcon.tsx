import React from 'react'



interface CustomIconType {
    icon?: React.ReactNode
    color: number
    className?: string
}
export const colorsList =[
      "#6610f2",
      "#6f42c1",
      "#e83e8c",
      "#dc3545",
       "#007bff",
       "#17a2b8",
       "#ffff",
       "#eea56a",
       "#00B98E"
    //   yellow: #ffc107;
    //   green: #28a745;
    //   teal: #20c997;

]

function CustomIcon({icon,color,className}:CustomIconType) {
  return (
    <div style={{backgroundColor: colorsList[color]}}  className={`${className}  flex  justify-center items-center text-white rounded-full`}>
      {icon}  
    </div>
  )
}

export default CustomIcon