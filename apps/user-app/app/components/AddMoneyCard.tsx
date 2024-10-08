"use client";
import React from "react";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textInput";
import { Button } from "@repo/ui/button";

import { createOnRampTransaction } from "../lib/actions/createOnRampTransactions";
const SUPPORTED_BANKS = [
  {
    id: "1",
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
];
export default function () {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(e: string) => {
            console.log("Input changed:", e);
            setAmount(Number(e));
          }}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value: any) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              if (loading) return;
              setLoading(true);
              if (amount == 0) {
                setLoading(false);
                return;
              }
              const status = await createOnRampTransaction("hdfc", amount);
              // alert(status.token);
              window.open(
                "https://mock-bank-amber.vercel.app/" +
                  `?token=${status.token}`,
                "_blank"
              );
              setLoading(false);
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
}
