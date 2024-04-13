"use client "
import React, { SetStateAction, useCallback, useState } from "react"
import { MouseEventHandler } from "react"
import { FaSort } from "react-icons/fa6"
import { DocumentData } from "firebase/firestore"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdSearch } from "react-icons/md";
import Select from "./web-default/Select"
import Input from "./web-default/Input"
import { usePagination } from "../hooks/usePagination"
import useTable from "../hooks/useTable"
import { useSort } from "../hooks/UseSort"

interface TableFilterInterface {
    setUpdatedData: React.Dispatch<React.SetStateAction<DocumentData[] | null>>
    data: DocumentData[] | null
    tHeadData: string[]
    setting?: boolean
}

export interface TableCols {
  field: string
  headerName?: string
  width?: number
  onColClick?:() => void
  renderCell?: ({row}:{row:DocumentData}) => React.ReactNode
}


interface TableHeadInterface {
    value: string
    onClick: MouseEventHandler<HTMLElement> | undefined
   
}

interface TableSearchInterface {setUpdate:React.Dispatch<React.SetStateAction<DocumentData[] | null>>,setting?:boolean, data:DocumentData[] | null}


interface PagnateInterface  {
  pageSize : number
  setPageSize: React.Dispatch<SetStateAction<number>>
  setRowsPerPage: React.Dispatch<SetStateAction<number>>
  updatedData: DocumentData[]
  range:number[]  
  data: DocumentData[] | null
  rowsPerPage:number
}
interface TableInterface {
  rows: DocumentData[]
  cols: TableCols[]
  className?: string
  includeFooter?:boolean
  includeHeader?: {
      header?: boolean
      search?:boolean
      filter?:boolean
  }

}

interface TableHeaderInterface extends Omit<TableFilterInterface, "setting" | "tHeadData">  {
  includeHeader?: {
    header?: boolean
    search?:boolean
    filter?:boolean
}| undefined
cols: TableCols[]

}



export const TableHead = ({ onClick, value }: TableHeadInterface) => {
  
    return (
     
    <th className="px-2 py-6 text-white align-middle border-b border-solid border-gray-500  text-sm whitespace-nowrap font-light text-left">
        <div className='flex gap-2 items-center'>
            {value} <span onClick={onClick}><FaSort className="!text-gray-400 cursor-pointer" /></span>
        </div>
    </th>
 
    )
}

export const TableCol = ({ value, size }: {value: React.ReactNode | string, size?: number | undefined}) => {
    return (<th style={{minWidth:size}} className="border-b border-gray-500 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
        {value}
    </th>
    )
}

export const TableSearch = ({data,setUpdate, setting}:TableSearchInterface) => {

  const searchTable = (qString: string) => {
    if(!qString || qString.length < 3) return setUpdate(data as DocumentData[])
    const keys = data && Object.keys(data[0] as DocumentData[])

    const idx = keys?.indexOf("date") as number
    keys?.splice(idx, 1)
     
    const newData = data?.filter((each) => keys?.some((key) => each[key]?.toString()?.toLowerCase()?.includes(qString)))
    setUpdate(newData as DocumentData[])
  }

    return (
        <div className={`${setting && "hidden"} w-full `}>
            <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MdSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <Input onChange={(e) => searchTable(e.target.value.toLowerCase())} id="simple-search" className="bg-transparent border  text-white text-sm   block w-full pl-10  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" />
                </div>
            </form>
        </div>
    )
}

export const TableFooter = ({data,pageSize,range, rowsPerPage,setPageSize,setRowsPerPage, updatedData}:PagnateInterface) => {


  const {handleNext, handlePrev,navLink} = usePagination(setPageSize, range, updatedData, pageSize)

    return (
        <nav className="flex flex-col md:flex-row border-t border-gray-500 justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            <span className="text-sm font-normal flex items-center gap-2 text-white dark:text-gray-400">
                Showing {" "}
                <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}  className="font-semibold *:bg-sec-bg bg-sec-bg text-main-color outline-none border border-gray-500 rounded-md dark:text-white"> 
                    <option value={"10"}>10</option>
                    <option value={"50"}>50</option>
                    <option value={"100"}>100</option>
                </select>
                {" "} of
                <span className="font-semibold text-main-color dark:text-white">{data?.length}</span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px ">
                <li className="cursor-pointer" onClick={handlePrev}>
                    <span  className="flex items-center justify-center h-full py-1.5 px-3 ml-0  gradient-btn rounded-l-lg border border-gray-500  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Previous</span>
                        <MdKeyboardArrowLeft className="w-5 h-5" />
                    </span>
                </li>
                <li className="flex">
                    {navLink().map(each => each)}
                </li>
              
                <li className="cursor-pointer" onClick={handleNext}>
                    <span  className="flex items-center justify-center h-full py-1.5 px-3 leading-tight gradient-btn rounded-r-lg border border-gray-500  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Next</span>
                        <MdKeyboardArrowRight className="w-5 h-5" />
                    </span>
                </li>
            </ul>
        </nav>
    )
}



  export const TableFilter: React.FC<TableFilterInterface> = ({tHeadData, setUpdatedData, data }) => {

    const [selectedField, setSelectedField] = useState<string>("date");
    

    const statMethod = ["status", "method", "date"]
    const inputFields: string[] = tHeadData.filter(each => !statMethod.includes(each));
    const filterFields: string[] = [...tHeadData];
    const selectFields: Record<string, string[]> = {
      status: ["all status","pending", "error", "success"],
      method: ["all method","bank", "usdt", "bitcoin"]
    };

  

    const filterTable = (field: string, value: string) => {
   
      //check if we are at the status or method field then all status and method should be equal to empty
      if (Object.keys(selectFields).includes(field) && value.includes("all")) return setUpdatedData(data)
       //if no value then set the updatedData or rows to the initial data from db
      if(!value) return setUpdatedData(data)
       
        //check if the query is by date then update the state
      if(field === "date"){
        const ddate = new Date(value).toDateString()
        const newDataDate = data?.filter((each) => new Date(each[field].toDate()).toDateString() === ddate)
        return setUpdatedData(newDataDate as DocumentData[])
      }
   // filter our data according to the query passed
      const newData = data?.filter(each => each[field]?.toString()?.toLowerCase() === value.toLowerCase())
       
      //update the state with the filtered datas
      setUpdatedData(newData as DocumentData[])
    }
  
    const getFilterComponent = useCallback((value: string) => {


        const index = filterFields.indexOf(value === "account no"? "accountNumber": value)

      if (inputFields.includes(value)) {
        return <Input className="lg:!w-[90%] !w-full" onChange={(e) => filterTable(filterFields[index],e.target.value)} placeholder={value.charAt(0).toUpperCase() + value.slice(1)} />;
      } else if (Object.keys(selectFields).includes(value)) {
        return (
          <Select className="!px-2 lg:!w-[90%] !w-full" onChange={(e) => filterTable(filterFields[index],e.target.value)}>
            {selectFields[value].map((option, idx) => (
              <option key={idx} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
            ))}
          </Select>
        );
      } else {
        return <Input className="lg:!w-[90%] !w-full" onChange={(e) => filterTable(filterFields[index],e.target.value)} type="date" />;
      }
    }, [selectedField]);
  
    return (
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 lg:gap-0 lg:w-4/5 w-full  lg:mt-0 mt-3 place-self-end">
       
          {getFilterComponent(selectedField)}
      
          <Select className="lg:!w-[90%] !w-full" onChange={(e) => {
            setSelectedField(e.target.value)
            setUpdatedData(data)
            }}>
            {tHeadData.map((each, idx) => (
              <option key={idx} value={each}>{each.charAt(0).toUpperCase() + each.slice(1)}</option>
            ))}
          </Select>
        
      </div>
    );
  }

  const TableHeader = ({setUpdatedData, data, cols, includeHeader }:TableHeaderInterface) => {
    return (
      <div className={`${includeHeader?.header && "hidden"} grid  w-full grid-cols-1 lg:grid-cols-2 grid-rows-subgrid gap-1 lg:gap-4 `}>
      <TableSearch setting={includeHeader?.search}  setUpdate={setUpdatedData} data={data} />
      <TableFilter setting={includeHeader?.filter} tHeadData={cols.map(each => each.field)} setUpdatedData={setUpdatedData} data={data} />
      </div>
    )
  }
  



export function Table({className,cols,includeFooter=true,includeHeader,rows}:TableInterface) {
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [pageSize, setPageSize] = useState(1);

  const { updatedData, range, setUpdatedData } = useTable(rows, pageSize, rowsPerPage);
  
  const [setShouldSorte, handleSort] = useSort(rows as DocumentData[], setUpdatedData)

  return (
    <>
      <TableHeader  setUpdatedData={setUpdatedData}  cols={cols} data={rows} includeHeader={includeHeader} />
    <div className="overflow-x-auto min-h-[60vh] max-w-full">
    
    <table className={`${className} w-full bg-transparent  border-collapse `}>
       <thead>
            <tr className='*:text-main-color  *:!font-bold *:!text-[16px] '>
               {cols.map((each, idx) => (
                <TableHead onClick={() => {
                  handleSort(each.field.toLowerCase())
                  setShouldSorte(prev => !prev)
                }} value={each.headerName? each.headerName: each.field} key={idx} />
              ))}
           </tr>
           </thead>
           <tbody>
            {updatedData?.length as number > 0 &&
              updatedData?.map((each) => (
                <tr key={each.idx}>
                  {
                    cols.map((col, index) => (
                      <TableCol size={col.width} value={col.renderCell? col.renderCell({row:each}) : each[col.field]} />
                    ))
                  }
                </tr>
              ))}
            {!rows?.length && (
              <tr>
                <td
                  colSpan={6}
                  className=" text-red-500 uppercase text-center pt-8 text-sm font-bold "
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>

    </table>
    </div>
    {includeFooter && 
     <TableFooter  updatedData={updatedData as DocumentData[]} data={rows} rowsPerPage={rowsPerPage} range={range}  pageSize={pageSize} setPageSize={setPageSize} setRowsPerPage={setRowsPerPage} />
      }
     </>
  )
}

