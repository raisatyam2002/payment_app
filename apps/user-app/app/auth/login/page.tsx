"use client";
import { signIn } from "next-auth/react";
import { Button } from "@repo/ui/button";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  console.log(process.env.NEXT_PUBLIC_NEXTAUTH_URL);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    const result = await signIn("credentials", {
      phone: phoneNumber,
      password: password,
      redirect: false,
    });
    if (result?.error) {
      console.error("Login error:", result.error);
      alert(result.error);
    } else {
      alert("logged in successfully");
      router.push("/dashboard");
    }
    setLoading(false);
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
        <Button
          onClick={() => {
            handleLogin();
          }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log in"}
        </Button>
        <h1>
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="cursor hover:underline decoration-gray-500"
          >
            Sign up
          </Link>
        </h1>
      </div>
    </div>
  );
}
