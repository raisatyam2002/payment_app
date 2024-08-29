"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

// Data for the doughnut chart
const data: ChartData<"doughnut"> = {
  labels: ["Car Services", "Entertainment", " Online Shopping", "Households"],
  datasets: [
    {
      label: "Expenses",
      data: [23032.0, 23032.0, 23032.0, 20007.3], // Data values for each category
      backgroundColor: [
        "#68EE76", // Color for Online Shopping
        "#FEBD38", // Color for Entertainment
        "#8D79F6", // Color for Car Service
        "#4FBAF0", // Color for Households
      ],
      //   borderColor: [
      //     "rgba(75, 192, 192, 1)", // Border color for Online Shopping
      //     "rgba(255, 206, 86, 1)", // Border color for Entertainment
      //     "rgba(153, 102, 255, 1)", // Border color for Car Service
      //     "#4FBAF0", // Border color for Households
      //   ],
      borderWidth: 2,
    },
  ],
};

// Calculate the total amount
const totalAmount =
  data.datasets[0]?.data?.reduce((acc, value) => acc + value, 0) ?? 0;

// Custom plugin to draw total amount inside the chart
const totalAmountPlugin = {
  id: "totalAmountPlugin",
  afterDatasetsDraw(chart: any) {
    const {
      ctx,
      chartArea: { top, bottom, left, right },
    } = chart;
    const fontSize = 18;
    const fontFamily = "Arial";
    const text = `$${totalAmount.toLocaleString()}`;
    const x = (left + right) / 2;
    const y = (top + bottom) / 2;

    ctx.save();
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
    ctx.restore();
  },
};

// Chart options with the custom plugin
const options: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false, // Allows the chart to fill the container's size
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.label || "";
          if (context.parsed) {
            label += ": $" + context.parsed + " (USD)";
          }
          return label;
        },
      },
    },
  },
  cutout: "70%", // Adjusts the inner radius of the doughnut
};

export default function PieChart() {
  return (
    <div className="w-full h-3/4 m-8">
      <Doughnut data={data} options={options} plugins={[totalAmountPlugin]} />
    </div>
  );
}
