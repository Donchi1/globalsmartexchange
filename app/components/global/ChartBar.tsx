"use client"
import { useEffect } from 'react'
import {Chart,  PointElement, LinearScale, Title, CategoryScale, BarController, BarElement} from 'chart.js'
import { Bar } from 'react-chartjs-2'


Chart.register(BarController, BarElement, PointElement, LinearScale, Title, CategoryScale)


export default function ChartBar() {

    let config = {
  
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
            data: [30, 78, 56, 34, 100, 45, 13],
            fill: false,
            barThickness: 8,
          },
          {
            label: new Date().getFullYear().toString(),
            fill: false,
            backgroundColor: '#eee',
            borderColor: '#eee',
            fontColor: 'white',
            data: [27, 68, 86, 74, 10, 4, 87],
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: 'Orders Chart',
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          // mode: 'nearest',
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: 'white',
          },
          align: 'end',
          position: 'bottom',
        },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: 'Month',
                color: 'white',
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: 'rgba(33, 37, 41, 0.3)',
                zeroLineColor: 'rgba(33, 37, 41, 0.3)',
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                fontColor: 'white',
              },
              scaleLabel: {
                display: false,
                labelString: 'Value',
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: 'rgba(33, 37, 41, 0.2)',
                zeroLineColor: 'rgba(33, 37, 41, 0.15)',
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    }

  return (
    <section className="bg-sec-bg px-4 pb-4 pt-4 rounded-lg">
      
        <h6 className="uppercase text-gray-200 text-xl px-4 mb-4 font-medium">
         Market Value
        </h6>

      <div>
        <div className="relative h-96">
          <Bar {...config as any} />
        </div>
      </div>
    </section>
  )
}
