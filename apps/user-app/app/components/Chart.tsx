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
import { useEffect, useState } from "react";
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
interface BalanceHistoryInterface {
  id: number;
  userId: number;
  amount: number;
  Date: Date;
}
export default function Chart({
  lastFourWeeksTransactions,
}: {
  lastFourWeeksTransactions: BalanceHistoryInterface[] | null;
}) {
  const [labels, setLabels] = useState<any>();
  const [account, setAccount] = useState<any>();
  useEffect(() => {
    const labels = lastFourWeeksTransactions?.map((trx) =>
      new Date(trx.Date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    );
    setLabels(labels);
    const accountBalance = lastFourWeeksTransactions?.map((trx) => trx.amount);
    console.log("labels ", labels);
    console.log("accountBalance ", accountBalance);
    setAccount(accountBalance);
  }, [lastFourWeeksTransactions]);

  const data = {
    labels: labels,
    datasets: [
      {
        data: account,
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
  // if (!lastFourWeeksTransactions) {
  //   return <div>..</div>;
  // }

  return <Line data={data} options={options} />;
}
