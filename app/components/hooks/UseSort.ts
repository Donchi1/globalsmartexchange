"use client"
import { DocumentData } from "firebase/firestore"
import { Dispatch, SetStateAction,  useState } from "react"


export const useSort = (data:DocumentData[], setUpdatedData:Dispatch<SetStateAction<DocumentData[] | null>>) => {

    
    const [shouldSorte, setShouldSorte] = useState(false)
  
    const handleSort = (value: string) => {
      if (value === "account no") {
        value = "accountNumber"
      }
      const sorted = shouldSorte ? 
      (data?.sort((a, b) => b[value] - a[value])):(data?.sort((a, b) => a[value] - b[value]))
      setUpdatedData(sorted as DocumentData[])
    }
  


    return [setShouldSorte, handleSort] as const
  
}