"use client"
import React, { ReactNode, useState, useEffect, useLayoutEffect} from 'react'
import ReactDOM from 'react-dom';
import Flex from './web-default/Flex';
import { FaX } from 'react-icons/fa6';
import H2 from './web-default/H2';


type PlacementType = "center"| "top" | "bottom"| undefined

type modalTypes = {
    children: ReactNode,
    open: boolean,
    onClose? : any
    className?: string
    title?:string
    placement?: PlacementType
    closeOnDialogClick?: boolean
    classes?: {
      modalWrapperClassName?: string
      modalContentClassName?: string
      containerColorClass?: string
      headerClassName?:{
       buttonClassName?:string
       titleClassName?: string
       containerClassName?: string
      }
    }

}

const setPlacement = (placement:PlacementType) => placement === "top" ? "justify-start" : placement === "bottom" ? "justify-end" : "justify-center"



function Modal({children, open, onClose ,  title, placement, classes, closeOnDialogClick}: modalTypes) {

  

     const [doc, setDoc] = useState<HTMLElement | null>(null)
     
 
    useLayoutEffect(() => {
      const modalRoot = document.getElementById('modal-root') || null;
       setDoc(modalRoot)
    }, [])

  

  if(!doc) return <div></div>

  return  ReactDOM.createPortal(
  
    <dialog onClick={() => closeOnDialogClick && onClose()} open={open}  className={`${classes?.containerColorClass}  z-[100] fixed top-0 bottom-0 right-0 left-0 w-full h-screen bg-black/50`}>

    <div className={`${setPlacement(placement)} ${classes?.modalWrapperClassName} flex flex-col  min-w-fit w-[40%] mx-auto  h-screen min-h-max `}>
      <div className={`${classes?.modalContentClassName} bg-card-bg p-4 overflow-y-auto rounded-lg`}>
      <div className={`${classes?.headerClassName?.containerClassName} flex justify-between items-center`}>
        <H2 className={`${classes?.headerClassName?.titleClassName} text-black`}>{title}</H2>
        <button className={`${classes?.headerClassName?.buttonClassName} p-1 text-red-500 border rounded-md outline-none hover:opacity-80 border-red-400 self-end`} onClick={onClose} >
          <FaX size={20} />
        </button>
      </div>
      <div>
      {children}
      </div>
      </div>
     
        
        </div>
        </dialog>,
        doc as Element
  )
}

export default Modal