"use client";
import { Button } from "@repo/ui/button";
import { useState } from "react";
import Link from "next/link";
import { SignUp } from "../../lib/actions/SignUp";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { isDataView } from "util/types";
export default function SignUppage() {
  const userSignupObjet = z.object({
    name: z.string(),
    phoneNumber: z.number().int().gte(1000000000).lte(9999999999),
    password: z.string().min(5),
  });
  const router = useRouter();
  const [name, setName] = useState<string | undefined>();
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const handleSignUp = async () => {
    const phoneNum = Number(phoneNumber);
    console.log("phoneNum ", phoneNum);
    const isDataValid = userSignupObjet.safeParse({
      name: name,
      phoneNumber: phoneNum,
      password: password,
    });
    if (isDataValid.success) {
      const data = await SignUp({ name, phoneNumber, password });
      if (data.error) {
        alert(data.error);
      } else {
        alert(data.message);
        router.push("/auth/login");
      }
    } else {
      console.log(isDataValid);
      alert(
        "phoneNumber must  be of 10 digit and password must be of 5 alphabets"
      );
    }
  };
  return (
    <div>
      <div className=" flex justify-center z-0  ">
        <div className="flex flex-col gap-4 border border-gray-300 p-7 z-50  mt-24">
          <h1 className="text-center text-4xl">Welcome Back</h1>
          <input
            type="text"
            placeholder="Enter Name"
            className="h-10 px-2 border border-gray-400"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          ></input>
          <input
            type="text"
            placeholder="Enter Phone Number"
            className="h-10 px-2 border border-gray-400"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPhoneNumber(e.target.value);
            }}
          ></input>
          <input
            type="text"
            placeholder="Password"
            className="h-10 px-2 border border-gray-400"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          ></input>
          <Button onClick={handleSignUp}>Login</Button>
          <h1>
            Already a User?{" "}
            <Link
              href="/auth/login"
              className="cursor hover:underline decoration-gray-500"
            >
              login
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
}
