"use client"
import { useEffect } from 'react'
import {Chart, LineController, LineElement,CategoryScale, PointElement, LinearScale, Title} from 'chart.js'
import { Line } from 'react-chartjs-2'


Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale)

export default function ChartLine() {

    var config = {
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: new Date().getFullYear().toString(),
            backgroundColor: '#00B98E',
            borderColor: '#00B98E',
            data: [65, 78, 66, 44, 56, 67, 75],
            fill: false,
          },
          {
            label: new Date().getFullYear().toString(),
            fill: false,
            backgroundColor: '#eee',
            borderColor: '#eee',
            data: [40, 68, 86, 74, 56, 60, 87],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: 'Sales Charts',
          fontColor: 'white',
        },
        legend: {
          labels: {
            fontColor: 'white',
          },
          align: 'end',
          position: 'bottom',
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
         
          intersect: true,
        },
        // scales: {
        //   xAxes: [
        //     {
        //       ticks: {
        //         fontColor: 'white',
        //       },
        //       display: true,
        //       scaleLabel: {
        //         display: false,
        //         labelString: 'Month',
        //         fontColor: 'white',
        //       },
        //       gridLines: {
        //         display: false,
        //         borderDash: [2],
        //         borderDashOffset: [2],
        //         color: 'rgba(33, 37, 41, 0.3)',
        //         zeroLineColor: 'rgba(0, 0, 0, 0)',
        //         zeroLineBorderDash: [2],
        //         zeroLineBorderDashOffset: [2],
        //       },
        //     },
        //   ],
          // yAxes: [
          //   {
          //     ticks: {
          //       fontColor: 'white',
          //     },
          //     display: true,
          //     scaleLabel: {
          //       display: false,
          //       labelString: 'Value',
          //       fontColor: 'white',
          //     },
          //     gridLines: {
          //       borderDash: [3],
          //       borderDashOffset: [3],
          //       drawBorder: false,
          //       color: 'rgba(17, 17, 17, 0.15)',
          //       zeroLineColor: 'rgba(33, 37, 41, 0)',
          //       zeroLineBorderDash: [2],
          //       zeroLineBorderDashOffset: [2],
          //     },
          //   },
          // ],
        //},
      },
    }


  return (
    <section className="bg-sec-bg p-4 rounded-lg">
        
        <h6 className="uppercase text-gray-200 text-xl px-4 mb-4 font-medium">
          Overview
        </h6>

      <div>
        <div className="relative h-96 text-white">
           <Line {...config} />
        </div>
      </div>
    </section>
  )
}
