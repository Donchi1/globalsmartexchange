"use client"
import { DocumentData } from 'firebase/firestore'
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import H2 from './web-default/H2';
import formatCurrency from '@/utils/converter';


const Charts = dynamic(() => import("react-apexcharts"), {ssr: false})

function InvestmentStats({investments}:{investments: DocumentData[]}) {
 

    const startingDate = investments[0]?.date ? investments[0]?.date.toDate(): new Date();
    const today = new Date();
    const fixedDate = new Date(investments[0]?.date ? investments[0]?.date.toDate() : new Date())
    const endingDate = new Date(new Date(fixedDate).setDate(fixedDate.getDate() + 5));
    const timeDiff = Math.abs(endingDate.getTime() - today.getTime())
       
    const remainingDays = Math.round(timeDiff / (1000 * 60 * 60 * 24));

    const progressData = [
        {
          profit: (investments[0]?.profit * 100) / 100,
          progress: 100,
          text: "completed",
        },
        { profit: (investments[0]?.profit * 20) / 100, progress: 80, text: "progress" },

        { profit: (investments[0]?.profit * 40) / 100, progress: 60, text: "progress" },

        { profit: (investments[0]?.profit * 60) / 100, progress: 40, text: "progress" },

        { profit: (investments[0]?.profit * 80) / 100, progress: 20, text: "progress" },   
    ]
  
  
    
  
    const getProgressInfo = () => progressData[remainingDays] ||{
            profit: investments[0]?.profit ? investments[0]?.profit : 0,
            progress: investments[0]?.profit ? 100 : 0,
            text: investments[0]?.profit ? "Ended" : "No trade",
          }
    
  
    const progressInfo = {
      series: [getProgressInfo().progress],
      options: {
        labels: [getProgressInfo().text],
        chart: {
          height: 350,
          width: 20,
        },
      },
    };
  
  
    const checkDays = () => {
      if(investments.length > 0){
        if(remainingDays > 5){
          return "Ended"
        }else{
         return remainingDays
        }
      }
      return "None"
       
    } 

   


  return (
    <section className='grid grid-cols-1 xl:grid-cols-5 gap-8 grid-rows-subgrid w-full'>
   
        <div className="xl:col-start-1 bg-sec-bg rounded-lg py-4 xl:col-end-4 px-4">
          <div className="box">
            <H2 className="!text-[24px] mb-4">Latest Investment Stats</H2>
            <p className="mb-2 ">
              <span className="font-small text-gray-300 ">
                Investment Amount :{" "}
              </span>
              <span className="text-main-color">
                {formatCurrency(investments[0]?.investedAmount || "000")}
              </span>{" "}
            </p>
            <p className="mb-2 text-gray-200">
              <span className="font-small text-gray-300">
                Expected Profit :{" "}
              </span>
              <span className="text-main-color">
              {formatCurrency(investments[0]?.expectedProfit || "000")}{" "}
              </span>{" "}
              and above
            </p>
            <p className="mb-2 text-main-color">
              <span className="font-small text-gray-300">
                Investment Date :{" "}
              </span>
              {investments.length > 0 ? startingDate.toLocaleString("default", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                weekday: "short",
              }): "None"}
            </p>
            <p className="mb-2 text-main-color">
              <span className="font-small text-gray-300">
                Investment Ending Date :{" "}
              </span>
              {investments.length > 0 ? new Date(endingDate).toLocaleString("default", {
                day: "2-digit",
                weekday: "short",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }): "None"}
            </p>
            <p className="mb-2 text-main-color">
              <span className="text-gray-300 ">
                Remaing Days :{" "}
              </span>
              {checkDays()}
            </p>
            <p className="mb-2 text-main-color">
              <span className="font-small text-gray-300">
                Complete In :{" "}
              </span>
              5Days
            </p>
            <p className="mb-2 text-main-color">
              <span className="font-small text-gray-300">
                Earning Percent :{" "}
              </span>
              {investments.length > 0 ? "20%" : "None"}
            </p>
            <p className='text-main-color'>
              <span className="font-small text-gray-300">
                Charges: {""}
              </span>
              {investments.length > 0 ? "5%" : "None"}
            </p>
          </div>
        </div>

        <div className="xl:col-start-4 bg-sec-bg rounded-lg  xl:col-end-6 px-4 h-auto">
          <div className="box ">
            <div className=" d-flex flex-column flex-lg-row">
              <div className="d-flex mt-4 ">
                <div className="img-box ">
                  
                </div>
                <div>
                <H2 className="!text-[24px] mb-4">
                    Investment Progress Info
                  </H2>
                  <p className='text-main-color'><span className='text-[18px] font-bold text-gray-300'>Total: {" "}</span>{formatCurrency(getProgressInfo().profit)}</p>
                </div>
              </div>
             
              <Charts
              
                type="radialBar"
                series={progressInfo.series}
                
                options={{
                  ...progressInfo.options,
           
                  fill: { colors: ["#008000"] },
                  chart: {
                    height: 20,
                    width: 10,
                  },
                  plotOptions: {
                    radialBar: {
                      dataLabels: {
                        name: {
                          color: "#f44336",
                        },
                        value: {
                          fontSize: "20px",
                          color: "white",
                        },
                      },
                      hollow: {
                        size: "80px",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
    
  </section>
  )
}

export default InvestmentStats