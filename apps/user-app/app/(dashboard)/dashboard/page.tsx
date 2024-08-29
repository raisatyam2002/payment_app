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

interface P2PTransactionsInterface {
  id: number;
  senderId: number;
  receiverId: number;
  amount: number;
  time: Date;
  receiverNumber: string;
}
export default function () {
  const [transactions, setTrans] = useState<P2PTransactionsInterface[] | null>(
    null
  );
  async function getTransactions() {
    const newtransactions = await getP2PTransactions();
    newtransactions.sort((a, b) => b.id - a.id);
    setTrans(newtransactions);
  }
  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <div className="flex w-full ">
      <div className="border-2 border-gray-100 w-2/3">
        <div className="flex h-1/2">
          <div className="w-1/2">
            <PieChart></PieChart>
          </div>
          <div className="pt-36 font-sans font-light">
            <div className=" flex gap-4 ">
              <div className="flex ">
                <Image src={purple} alt="purple" />
                <div>
                  <h4>Online Shoppping</h4>
                  <h4 className="text-center font-medium">$ 23032.0</h4>
                </div>
              </div>
              <div className="flex">
                <Image src={yellow} alt="yellow" />
                <div>
                  <h4>Entertainmnets</h4>
                  <h4 className="text-center font-medium">$ 23032.0</h4>
                </div>
              </div>
            </div>
            <div className=" flex gap-10 mt-10">
              <div className="flex">
                <Image src={green} alt="purple" />
                <div>
                  <h4>Car services</h4>
                  <h4 className="text-center font-medium">$ 23032.0</h4>
                </div>
              </div>
              <div className="flex ml-3">
                <Image src={blue} alt="yellow" />
                <div className="">
                  <h4>Households</h4>
                  <h4 className="text-center font-medium">$ 20007.30</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="" style={{ height: "320px", width: "100%" }}>
          <Chart></Chart>
        </div>
      </div>
      <div>
        <div>
          <Image src={creditCard} alt="credit Card"></Image>
        </div>
        <div className="h-96 m-2">
          <P2PTransactions transactions={transactions}></P2PTransactions>
        </div>
      </div>
    </div>
  );
}
