"use client";
import React from "react";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInput";
import { Button } from "@repo/ui/button";
import { useState } from "react";
import sendMoney from "../lib/actions/sendMoney";
export function SendMoneyCard({
  handleTransactions,
}: {
  handleTransactions: () => void;
}) {
  const [number, setNumber] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  return (
    <div className="">
      <Card title="Send Money">
        <div className="min-w-72 pt-2">
          <TextInput
            label={"Number"}
            placeholder={"Enter Number"}
            onChange={(e: string) => {
              setNumber(Number(e));
            }}
          />
          <TextInput
            label={"Amount"}
            placeholder={"Enter Amount"}
            onChange={(e: string) => {
              setAmount(Number(e));
            }}
          />
          <div className="pt-4 flex justify-center">
            <Button
              onClick={async () => {
                const res = await sendMoney({ number, amount });
                handleTransactions();
                alert(res.message);
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
