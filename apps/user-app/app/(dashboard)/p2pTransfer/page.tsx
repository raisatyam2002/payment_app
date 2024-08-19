import React from "react";
import { SendMoneyCard } from "../../components/SendMoneyCard";
import { OnRampTransactions } from "../../components/OnRampTransactions";
import { Card } from "@repo/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import db from "@repo/db/client";
import { P2PTransactions } from "../../components/P2PTransactions";

interface P2PTransactionsInterface {
  id: number;
  senderId: number;
  receiverId: number;
  amount: number;
  time: Date;
  receiverNumber: string;
}
async function getP2PTransactions() {
  const session = await getServerSession(authOptions);
  const tx = await db.p2P.findMany({
    where: {
      senderId: Number(session?.user?.id),
    },
    include: {
      receiver: {
        select: {
          phone: true,
        },
      },
    },
  });
  return tx.map((t) => {
    return {
      id: t.id,
      senderId: t.senderId,
      receiverId: t.receiverId,
      amount: t.amount,
      time: t.startTime,
      receiverNumber: t.receiver.phone,
    };
  });
}
export default async function () {
  const transactions = await getP2PTransactions();
  transactions.sort(
    (a: P2PTransactionsInterface, b: P2PTransactionsInterface) => {
      console.log(a.id, " ", b.id);

      return b.id - a.id;
    }
  );
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-64">
      <div className="">
        <SendMoneyCard></SendMoneyCard>
      </div>
      <div>
        <P2PTransactions transactions={transactions}></P2PTransactions>
      </div>
    </div>
  );
}
