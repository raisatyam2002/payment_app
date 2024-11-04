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
import { Suspense } from "react";
import Loader from "../../components/Loader";
import useSWR from "swr";
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
  async function getTransactions() {
    const newtransactions = await getP2PTransactions();
    return newtransactions.sort((a, b) => b.id - a.id);
  }
  async function getTopFourTransactions() {
    const newtransactions = await getP2PTransactions();

    newtransactions.sort((a, b) => b.amount - a.amount);
    // alert(newtransactions[2]?.receiverNumber);

    return newtransactions.slice(0, 4);
  }
  async function getLastFourWeekBalance() {
    const transaction = await lastFourWeeks();
    return transaction;
  }

  const { data: topFourTransactions, error: topFourError } = useSWR(
    "top-four-transactions",
    getTopFourTransactions,
    {
      revalidateOnFocus: true,
    }
  );
  const { data: transactions, error: transactionError } = useSWR(
    "transactions",
    getTransactions,
    {
      revalidateOnFocus: true,
    }
  );
  const { data: lastFourWeeksTransactions, error: lastFourWeek } = useSWR(
    "lastFourWeek",
    getLastFourWeekBalance,
    {
      revalidateOnFocus: true,
    }
  );
  return (
    <div className="sm:flex sm:w-full ">
      <div className="sm:border-2 sm: border-gray-100 sm:w-2/3">
        <div className="sm:flex h-1/2">
          {topFourTransactions ? (
            <>
              <div className="sm:w-1/2 w-screen">
                <PieChart topFourTransactions={topFourTransactions}></PieChart>
              </div>
              <div className="sm:pt-36 font-sans font-light pt-6  pb-6  ">
                <div className=" flex gap-10 ">
                  <div className="flex ">
                    <Image className="w-16 h-16" src={purple} alt="purple" />

                    <div>
                      <h4>
                        {topFourTransactions &&
                          topFourTransactions[0]?.receiverNumber}
                      </h4>
                      <h4 className="text-center font-medium whitespace-nowrap">
                        ${" "}
                        {topFourTransactions && topFourTransactions[0]?.amount}
                      </h4>
                    </div>
                  </div>
                  <div className="flex ">
                    <Image className="w-16 h-16" src={yellow} alt="yellow" />
                    <div>
                      <h4>
                        {topFourTransactions &&
                          topFourTransactions[1]?.receiverNumber}
                      </h4>
                      <h4 className="text-center font-medium whitespace-nowrap">
                        ${" "}
                        {topFourTransactions && topFourTransactions[1]?.amount}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className=" flex gap-10 mt-10">
                  <div className="flex">
                    <Image className="w-16 h-16" src={green} alt="purple" />
                    <div>
                      <h4>
                        {topFourTransactions &&
                          topFourTransactions[2]?.receiverNumber}
                      </h4>
                      <h4 className="text-center font-medium whitespace-nowrap">
                        ${" "}
                        {topFourTransactions && topFourTransactions[2]?.amount}
                        .0
                      </h4>
                    </div>
                  </div>
                  <div className="flex ">
                    <Image className="w-16 h-16" src={blue} alt="yellow" />
                    <div className="">
                      <h4>
                        {topFourTransactions &&
                          topFourTransactions[3]?.receiverNumber}
                      </h4>
                      <h4 className="text-center font-medium whitespace-nowrap">
                        ${" "}
                        {topFourTransactions && topFourTransactions[3]?.amount}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </>
          ) : (
            <Loader></Loader>
          )}
        </div>
        <div className="" style={{ height: "320px", width: "100%" }}>
          {lastFourWeeksTransactions ? (
            <Chart
              lastFourWeeksTransactions={lastFourWeeksTransactions}
            ></Chart>
          ) : (
            <Loader></Loader>
          )}
        </div>
      </div>
      <div>
        <div className="sm:pl-0 flex justify-center items-center">
          <Image src={creditCard} alt="credit Card"></Image>
        </div>
        <div className="h-96 m-2">
          {transactions ? (
            <P2PTransactions transactions={transactions}></P2PTransactions>
          ) : (
            <Loader></Loader>
          )}
        </div>
      </div>
    </div>
  );
}
