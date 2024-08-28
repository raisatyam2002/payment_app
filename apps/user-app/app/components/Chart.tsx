"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "#9C88FB",
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false, // Important to let the chart take the full width and height
  plugins: {
    legend: {
      display: false, // Disable the legend
    },
  },
};

export default function Chart() {
  return <Line data={data} options={options} />;
}
