"use client";
import { signIn } from "next-auth/react";
import { Button } from "@repo/ui/button";
import { useState } from "react";
import Link from "next/link";
export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const handleLogin = async () => {
    await signIn("credentials", {
      phone: phoneNumber,
      password: password,
      redirect: true,
      callbackUrl: "http://localhost:3000/dashboard",
    });
  };
  return (
    <div className=" flex justify-center z-0  ">
      <div className="flex flex-col gap-4 border border-gray-300 p-7 z-50  mt-24">
        <h1 className="text-center text-4xl">Welcome Back</h1>
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
        <Button onClick={handleLogin}>Login</Button>
        <h1>
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="cursor hover:underline decoration-gray-500"
          >
            SignUp
          </Link>
        </h1>
      </div>
    </div>
  );
}
