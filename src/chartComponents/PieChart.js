import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function PieChart({ chartData }) {
  return <Pie data={chartData} options={{
    maintainAspectRatio: false,
    plugins:{
      legend:{
        labels:{
          usePointStyle: true,
          boxHeight:6,
          boxWidth:6
        },
        position:"right",
        align:"start"
      },
    },
    spacing:0
  }}/>;
}

export default PieChart;