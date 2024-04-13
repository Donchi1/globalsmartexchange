"use client"
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";





const useTable = (data:DocumentData[] | null, page:number, rowsPerPage:number) => {
 
  const [tableRange, setTableRange] = useState<number[]>([]);

  const [updatedData, setUpdatedData] = useState<DocumentData[] | null>([])

  const calculateRange = (data: DocumentData[], rowsPerPage:number) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  
  let i = 1;
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = (data:any, page:number, rowsPerPage:number) => {
  return data.slice((page - 1) * rowsPerPage, rowsPerPage * page);
};

  useEffect(() => {
    const range = calculateRange(data as DocumentData[], rowsPerPage);
    setTableRange([...range]);

    const slice = sliceData(data, page, rowsPerPage);
    setUpdatedData([...slice]);
  }, [data, setTableRange, page, setUpdatedData, rowsPerPage]);

  return { updatedData, range: tableRange, setUpdatedData };
};

export default useTable;