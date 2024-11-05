"use client";
import React, { useEffect } from "react";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textInput";
import { Button } from "@repo/ui/button";
import { PaymentProcessingAnimation } from "../components/PaymentProcessingAnimation";
import { createOnRampTransaction } from "../lib/actions/createOnRampTransactions";
import { checkTransactionStatus } from "../lib/actions/checkTransactionStatus";
import { toast } from "react-toastify";
export default function () {
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [paymentAnimation, setPaymentAnimation] = useState(false);
  const [token, setToken] = useState<string | undefined>();
  const statusMessages = {
    Success: () => toast.success("Money transferred"),
    Failure: () =>
      toast.error("Error while transferring money, try again after some time"),
  };
  useEffect(() => {
    let pollingInterval: NodeJS.Timeout;

    if (token) {
      pollingInterval = setInterval(async () => {
        const status = await checkTransactionStatus(token);

        if (status === "Success" || status === "Failure") {
          statusMessages[status]?.();
          clearInterval(pollingInterval);
          setPaymentAnimation(false);
        }
      }, 3000);
    }
    return () => clearInterval(pollingInterval);
  }, [token]);

  if (paymentAnimation) {
    return <PaymentProcessingAnimation></PaymentProcessingAnimation>;
  }
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
          option={{
            key: "1",
            value: "HDFC BANK",
          }}
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
              const onRamp = await createOnRampTransaction("hdfc", amount);
              if (!onRamp.token) {
                console.error(
                  onRamp.message ||
                    "An error occurred while processing your transaction."
                );
                toast.error("error occurred while processing your transaction");
                setLoading(false);
                return;
              }
              setToken(onRamp.token);
              console.log(
                "Bank Webhook URL:",
                process.env.NEXT_PUBLIC_BANK_WEBHOOK
              );
              const webhookUrl = `${process.env.NEXT_PUBLIC_BANK_WEBHOOK}?token=${onRamp.queryParams}`;
              console.log("Webhook URL:", webhookUrl);

              window.open(
                process.env.NEXT_PUBLIC_BANK_WEBHOOK +
                  `?token=${onRamp.queryParams}`,
                "_blank"
              );
              setPaymentAnimation(true);
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
