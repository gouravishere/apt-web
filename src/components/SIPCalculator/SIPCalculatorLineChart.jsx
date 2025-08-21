import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  Filler
);

const SIPCalculatorLineChart = ({ chartData, year }) => {
  const data = {
    labels: new Array(year).fill(1).map((item, index) => index + 1),
    datasets: [
      {
        label: "Growth Over Time",
        data: chartData,
        fill: true,
        backgroundColor: "rgba(72, 187, 120, 0.2)",
        borderColor: "rgba(72, 187, 120, 1)",
        tension: 0.4,
        pointRadius: 2, // Show points for click
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0,0,0,0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#666",
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(0,0,0,0.1)",
        },
        ticks: {
          color: "#666",
          font: {
            size: 12,
          },
          callback: (value) => (Number.isInteger(value) ? `${value}` : ""),
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const datasetIndex = elements[0].datasetIndex;
        const dataIndex = elements[0].index;
        const value = chartData[dataIndex];
        const yearLabel = data.labels[dataIndex];
        alert(`Year ${yearLabel}: ${value}L`);
      }
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-4xl mx-auto border border-gray-200">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold mb-4 text-start">Growth Over Time</h2>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-green-400"></div>
          <span className="text-sm font-medium text-gray-700">
            Growth Over Time
          </span>
        </div>
      </div>
      <div className="relative w-full h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SIPCalculatorLineChart;
