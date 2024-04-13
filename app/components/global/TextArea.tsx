import React from 'react'

interface TextAreaInterface {
  placeholder?: string
   onChange:React.ChangeEventHandler<HTMLTextAreaElement> | undefined
   className?: string
   value?: string
   cols?:number
   rows?:number
   error: any
}

function TextArea({rows, cols,onChange,className,placeholder,value, error, ...orders}:TextAreaInterface) {
  return (
    <textarea {...orders}  value={value} onChange={onChange} placeholder={placeholder} rows={rows} cols={cols}  className={`${className} ${error && "border-red-500"} hover:border-main-color focus:border-main-color border-gray-700 transition-colors ease-linear text-white duration-500 outline-none resize-none bg-transparent border rounded-3xl p-4 w-full`}></textarea>
  )
}

export default TextArea