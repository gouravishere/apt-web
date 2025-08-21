import React from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register the necessary chart components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Charts = ({ results, inputs }) => {
  // Data for the Growth Chart (Line Chart)
  const months = [];
  const growthData = [];
  let currentAmount = 0;
  const monthlyRate = inputs.annualRate / 100 / 12;
  const durationMonths = inputs.durationYears * 12 + inputs.durationMonths;
  for (let i = 1; i <= durationMonths; i++) {
    currentAmount += inputs.amount * Math.pow(1 + monthlyRate, i);
    months.push(`Month ${i}`);
    growthData.push(currentAmount);
  }

  const growthChartData = {
    labels: months,
    datasets: [
      {
        label: "Growth Over Time",
        data: growthData,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  // Data for the Breakdown Chart (Pie Chart)
  const breakdownData = {
    labels: ["Total Investment", "Interest Earned"],
    datasets: [
      {
        data: [results.totalInvestment, results.totalInterest],
        backgroundColor: ["#4CAF50", "#FF6384"],
      },
    ],
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Graphs and Visuals</h2>
      <div className="grid grid-cols-2">
        {/* Growth Chart */}
        <div className="mb-8">
          <h3 className="text-md font-medium">Growth Over Time (Line Chart)</h3>
          <Line data={growthChartData} />
        </div>

        {/* Breakdown Chart */}
        <div>
          <h3 className="text-md font-medium">
            Investment Breakdown (Pie Chart)
          </h3>
          <Pie data={breakdownData} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
