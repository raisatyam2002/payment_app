"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@repo/ui/card";

interface P2PTransactionsInterface {
  id: number;
  senderId: number;
  receiverId: number;
  amount: number;
  time: Date;
  receiverNumber: string;
}
export function P2PTransactions({
  transactions,
}: {
  transactions: P2PTransactionsInterface[] | null | undefined;
}) {
  if (transactions == null) {
    return (
      <Card title="P2P">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  } else if (transactions.length == 0) {
    return (
      <Card title="P2P">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  } else {
    return (
      <div className="overflow-auto h-full">
        <Card title="Recent transactions">
          <div className="pt-2">
            {transactions?.map((t) => (
              <div className="flex justify-between">
                <div key={t.id}>
                  <div className="text-sm">SENT INR to {t.receiverNumber}</div>
                  <div className="text-slate-600 text-xs">
                    {t.time.toDateString()}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  Rs {t.amount}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }
}
