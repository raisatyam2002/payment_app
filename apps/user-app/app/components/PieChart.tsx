import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
interface P2PTransactionsInterface {
  id: number;
  senderId: number;
  receiverId: number;
  amount: number;
  time: Date;
  receiverNumber: string;
}
// Register the required components

export default function PieChart({
  topFourTransactions,
}: {
  topFourTransactions: P2PTransactionsInterface[] | null;
}) {
  // if (topFourTransactions == null) alert("hi");
  console.log("four transcarion ", topFourTransactions);

  const labels = topFourTransactions?.map((tx) => tx.receiverId);
  const amountData = topFourTransactions?.map((tx) => tx.amount) || [];
  ChartJS.register(ArcElement, Tooltip, Legend);

  // Data for the doughnut chart
  const data: ChartData<"doughnut"> = {
    labels: labels,
    datasets: [
      {
        label: "Expenses",
        data: amountData, // Data values for each category
        backgroundColor: [
          "#68EE76", // Color for Online Shopping
          "#FEBD38", // Color for Entertainment
          "#8D79F6", // Color for Car Service
          "#4FBAF0", // Color for Households
        ],

        borderWidth: 2,
      },
    ],
  };

  // Calculate the total amount
  console.log("amount Data ", amountData);
  console.log(amountData[0]);

  const totalAmount = amountData.reduce((acc, value) => acc + value, 0) ?? 0;
  console.log("totalAmount ", totalAmount);

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
  if (!topFourTransactions) {
    return <div></div>;
  }
  return (
    <div className="w-full h-3/4 sm:m-8">
      <Doughnut data={data} options={options} plugins={[totalAmountPlugin]} />
    </div>
  );
}
