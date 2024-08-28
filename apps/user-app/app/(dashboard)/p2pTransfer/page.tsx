"use client";
import React, { useEffect, useState } from "react";
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
    getTransactions(); // Call it initially
  }, []);

  // Callback to refresh transactions
  const handleTransaction: () => void = () => {
    getTransactions(); // Call it when needed
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-64">
      <div className="">
        <SendMoneyCard handleTransactions={handleTransaction}></SendMoneyCard>
      </div>
      <div>
        <P2PTransactions transactions={transactions}></P2PTransactions>
      </div>
    </div>
  );
}
