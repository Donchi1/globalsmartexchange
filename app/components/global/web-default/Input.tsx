import React from 'react'


interface InputInterface {
  type?: string
  placeholder?: string
   onChange:React.ChangeEventHandler<HTMLInputElement> | undefined
   className?: string
   value?: string
   error?: any
   id?: string
   title?: string
   disabled?:boolean
   readOnly?: boolean
}

function Input({onChange,error,disabled, id, value,title,className, readOnly, placeholder, type,...orders}:InputInterface) {
  return (
    <input readOnly={readOnly} disabled={disabled} title={title} {...orders}  className={`${className} ${error && "border-red-500"} text-white hover:border-main-color px-4 py-3 focus:!border-main-color transition-colors ease-linear duration-500 outline-none bg-transparent border-gray-700 border rounded-full w-full`} placeholder={placeholder} id={id} value={value} onChange={onChange} type={type} />
  )
}

export default Input