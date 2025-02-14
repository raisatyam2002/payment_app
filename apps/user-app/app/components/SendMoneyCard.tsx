"use client";
import React from "react";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInput";
import { Button } from "@repo/ui/button";
import { useState } from "react";
import sendMoney from "../lib/actions/sendMoney";
import searchNumber from "../lib/actions/searchNumber";
import { toast } from "react-toastify";
export function SendMoneyCard() {
  const [number, setNumber] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [numberList, setNumberList] = useState<String[]>();
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setNumber(Number(inputValue));

    if (!isNaN(Number(inputValue)) && inputValue !== "") {
      console.log("Fetching numbers...");
      const numbers = await searchNumber(Number(inputValue)); // Fetch from backend
      setNumberList(numbers); // Update available numbers
    }
  };
  return (
    <div className="">
      <Card title="Send Money">
        <div className="min-w-72 pt-2">
          <div className="pt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Number
            </label>
            <input
              onChange={handleInputChange}
              type="text"
              id="number-input"
              list="number-options"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Number"
              autoComplete="off"
            />
            <datalist id="number-options">
              {numberList?.map((num) => (
                <option key={num.toString()} value={num.toString()}>
                  {num}
                </option>
              ))}
            </datalist>
          </div>

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
                // alert(res.message);
                if (res.success) {
                  toast.success(res.message);
                } else {
                  // alert(res.message);
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
