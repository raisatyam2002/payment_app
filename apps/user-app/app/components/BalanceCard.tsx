import React from "react";

import { Card } from "@repo/ui/card";
export const BalanceCard = () => {
  return (
    <Card title="Balance">
      <div>
        <div className="flex justify-between border-b border-slate-300 pb-2">
          <div>Unlocked Balance</div>
          <div>0 INR</div>
        </div>
        <div className="flex justify-between border-b border-slate-300 pb-2">
          <div>Total Locked Balance</div>
          <div>0 INR</div>
        </div>
        <div className="flex justify-between border-b border-slate-300 pb-2 ">
          <div>Total Balance</div>
          <div>0 INR</div>
        </div>
      </div>
    </Card>
  );
};
