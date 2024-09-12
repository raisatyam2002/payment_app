"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import pieChart from "../../img/pieChart.png";
import purple from "../../img/purple.png";
import yellow from "../../img/yellow.png";
import green from "../../img/green.png";
import blue from "../../img/blue.png";
// import Chart from "../../img/Chart 8.png";
import PieChart from "../../components/PieChart";
import creditCard from "../../img/creditCard.png";
import Chart from "../../components/Chart";
import { SendMoneyCard } from "../../components/SendMoneyCard";
import { P2PTransactions } from "../../components/P2PTransactions";
import { getP2PTransactions } from "../../lib/actions/getP2Ptransactions";
import { log } from "console";
import lastFourWeeks from "../../lib/actions/getLastFourWeekTransactions";
interface P2PTransactionsInterface {
  id: number;
  senderId: number;
  receiverId: number;
  amount: number;
  time: Date;
  receiverNumber: string;
}
interface BalanceHistoryInterface {
  id: number;
  userId: number;
  amount: number;
  Date: Date;
}
export default function () {
  const [transactions, setTrans] = useState<P2PTransactionsInterface[] | null>(
    null
  );
  const [topFourTransactions, setTopFourTransactions] = useState<
    P2PTransactionsInterface[] | null
  >(null);
  const [lastFourWeeksTransactions, setLastFourWeeksTransactions] = useState<
    BalanceHistoryInterface[] | null
  >(null);
  async function getTransactions() {
    const newtransactions = await getP2PTransactions();
    newtransactions.sort((a, b) => b.id - a.id);
    setTrans(newtransactions);
  }
  async function getTopFourTransactions() {
    const newtransactions = await getP2PTransactions();
    newtransactions.sort((a, b) => b.amount - a.amount);
    setTopFourTransactions(newtransactions.slice(0, 4));

    // const topFourTransactions = newtransactions.slice(0, 4);

    // console.log("Top four transactions:", topFourTransactions);
  }
  async function getLastFourWeekBalance() {
    const transaction = await lastFourWeeks();
    setLastFourWeeksTransactions(transaction);
    console.log("last four weeks ", transaction);
  }

  useEffect(() => {
    getTransactions();
    getTopFourTransactions();
    getLastFourWeekBalance();
  }, []);
  return (
    <div className="sm:flex sm:w-full ">
      <div className="sm:border-2 sm: border-gray-100 sm:w-2/3">
        <div className="sm:flex h-1/2">
          <div className="sm:w-1/2 w-screen">
            <PieChart topFourTransactions={topFourTransactions}></PieChart>
          </div>
          <div className="sm:pt-36 font-sans font-light p-20 ">
            <div className=" flex gap-10 ">
              <div className="flex ">
                <Image className="w-16 h-16" src={purple} alt="purple" />

                <div>
                  <h4>
                    {topFourTransactions && topFourTransactions[0]?.receiverId}
                  </h4>
                  <h4 className="text-center font-medium whitespace-nowrap">
                    $ {topFourTransactions && topFourTransactions[0]?.amount}
                  </h4>
                </div>
              </div>
              <div className="flex ">
                <Image className="w-16 h-16" src={yellow} alt="yellow" />
                <div>
                  <h4>
                    {topFourTransactions && topFourTransactions[1]?.receiverId}
                  </h4>
                  <h4 className="text-center font-medium whitespace-nowrap">
                    $ {topFourTransactions && topFourTransactions[1]?.amount}
                  </h4>
                </div>
              </div>
            </div>
            <div className=" flex gap-10 mt-10">
              <div className="flex">
                <Image className="w-16 h-16" src={green} alt="purple" />
                <div>
                  <h4>
                    {topFourTransactions && topFourTransactions[2]?.receiverId}
                  </h4>
                  <h4 className="text-center font-medium whitespace-nowrap">
                    $ {topFourTransactions && topFourTransactions[2]?.amount}.0
                  </h4>
                </div>
              </div>
              <div className="flex ">
                <Image className="w-16 h-16" src={blue} alt="yellow" />
                <div className="">
                  <h4>
                    {topFourTransactions && topFourTransactions[3]?.receiverId}
                  </h4>
                  <h4 className="text-center font-medium whitespace-nowrap">
                    $ {topFourTransactions && topFourTransactions[3]?.amount}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="" style={{ height: "320px", width: "100%" }}>
          <Chart lastFourWeeksTransactions={lastFourWeeksTransactions}></Chart>
        </div>
      </div>
      <div>
        <div className="sm:pl-0 flex justify-center items-center">
          <Image src={creditCard} alt="credit Card"></Image>
        </div>
        <div className="h-96 m-2">
          <P2PTransactions transactions={transactions}></P2PTransactions>
        </div>
      </div>
    </div>
  );
}
