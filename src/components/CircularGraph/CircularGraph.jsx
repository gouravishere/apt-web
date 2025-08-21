import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const MultilayerDonutChart = ({ isTotal = true, orangeValue = 56, blueValue = 100 }) => {
  // Check for invalid values and show dummy data if necessary
  const isOrangeInvalid = isNaN(orangeValue) || orangeValue < 0 || orangeValue > 100;
  const isBlueInvalid = isNaN(blueValue) || blueValue < 0 || blueValue > 100;

  const orangeData = isOrangeInvalid ? [50, 50] : [orangeValue, 100 - orangeValue];
  const blueData = isTotal
    ? isBlueInvalid ? [64, 36] : [blueValue, 100 - blueValue]
    : isBlueInvalid ? [50] : [blueValue];

  const data = {
    datasets: [
      {
        // Outer layer - Percentage (Orange)
        data: orangeData,
        backgroundColor: ['#ff9800', 'rgba(0, 0, 0, 0)'], // Orange for percentage, transparent for remaining
        borderWidth: 0,
        radius: '70%',
        cutout: '50%',
      },
      {
        // Inner layer - Total (Blue)
        data: blueData,
        backgroundColor: ['#2196f3', '#e3e3e4'], // Blue for total, gray for remaining
        borderWidth: 0,
        radius: '77%',
        cutout: '60%',
      },
    ],
  };

  // Options for the chart
  const options = {
    layout: {
      padding: 0,
    },
    animation: {
      duration: 0, // Set animation duration to 0 to disable it
    },
    plugins: {
      legend: {
        display: false, // Disable legend for simplicity
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default MultilayerDonutChart;