"use client"
import React, { useState } from "react"
import { DocumentData } from "firebase/firestore"
import { SetStateAction, useEffect } from "react"


export const usePagination = (setPageSize:React.Dispatch<SetStateAction<number>>, range:number[], updatedData:DocumentData[],pageSize : number) => {
    



    //goto the next page
    const handleNext = ():void => {
         
        setPageSize((prev) => {
         if(prev === range.length) return prev
         return prev + 1})
 }

 //goto the previous page
 const handlePrev = ():void => {
       
     setPageSize((prev) => {
         if(prev === 1) return prev
         return prev - 1})
  
 }

useEffect(() => {
   
 if (updatedData.length < 1 && pageSize !== 1) {
   setPageSize(pageSize );
 }
}, [updatedData, pageSize, setPageSize]);




const navLink = () => {
   let link = []
   for(let i = 1; i <= range.length; i++){
   if(i=== 4 && range.length > 8){
    
        link.push(<span onClick={() => setPageSize(i)} key={i} className={`${i === pageSize && "!text-main-color"} cursor-pointer flex items-center justify-center text-sm py-2 px-3 leading-tight  text-gray-500 hover:text-white active:text-main-color bg-transparent border border-gray-500  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>...</span>)
        i = range.length - 2
   }else{
  
        link.push(<span onClick={() => setPageSize(i)} key={i} className={`${i === pageSize && "!text-main-color"} cursor-pointer flex items-center justify-center text-sm py-2 px-3 leading-tight  text-gray-500 hover:text-white active:text-main-color bg-transparent border border-gray-500  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>{i}</span>)
          
       }
      

   }
   return link

}

return {navLink, handleNext, handlePrev} 
}