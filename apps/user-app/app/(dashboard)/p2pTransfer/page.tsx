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
  return (
    <div className="w-full border-2 border-gray-100 p-4 sm:p-0 sm:flex sm:justify-center">
      <div className="sm:w-80 mt-40">
        <SendMoneyCard></SendMoneyCard>
      </div>
    </div>
  );
}
