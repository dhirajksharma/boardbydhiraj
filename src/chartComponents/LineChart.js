import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
  return <Line data={chartData} options={{
    maintainAspectRatio: false,
    radius: 0,
    borderWidth:1,
    borderJoinStyle:"bevel",
    layout:{
      padding:10
    },
    plugins:{

      legend:{
        position:"top",
        align: "end",
        labels:{
          usePointStyle:true,
          boxHeight:5,
          boxWidth:5
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: true
        }
      }
    }
  }}/>;
}

export default LineChart;