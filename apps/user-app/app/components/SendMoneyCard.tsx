"use client";
import React from "react";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInput";
import { Button } from "@repo/ui/button";
import { useState } from "react";
import sendMoney from "../lib/actions/sendMoney";
import { toast } from "react-toastify";
export function SendMoneyCard() {
  const [number, setNumber] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
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
                if (loading) return;
                setLoading(true);
                if (amount == 0 || number == 0) {
                  toast.error("Enter number and amount");
                  setLoading(false);
                  return;
                }
                const res = await sendMoney({ number, amount });
                if (res.success) {
                  toast.success(res.message);
                } else {
                  toast.error(res.message);
                }

                setLoading(false);
              }}
            >
              {loading ? "sending..." : "send"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
