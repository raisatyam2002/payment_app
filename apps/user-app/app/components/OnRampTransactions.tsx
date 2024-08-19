"use client";
import React from "react";
import { Card } from "@repo/ui/card";

import { OnRampStatus } from "@prisma/client";

interface transactionInterface {
  id: number;
  time: Date;
  amount: number;
  status: OnRampStatus;
  provider: string;
}
export function OnRampTransactions({
  transactions,
}: {
  transactions: transactionInterface[] | null;
}) {
  if (transactions && !transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  } else {
    return (
      <Card title="Recent Transactions">
        <div className="pt-2">
          {transactions?.map((t) => (
            <div className="flex justify-between">
              <div key={t.id}>
                <div className="text-sm">Received INR</div>
                <div className="text-slate-600 text-xs">
                  {t.time.toDateString()}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                + Rs {t.amount / 100}
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }
}
