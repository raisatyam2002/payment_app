"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import Loader from "./components/Loader";
import HomePage from "./components/Home";
export default function Home() {
  const router = useRouter();
  const { data, status } = useSession();
  if (status == "authenticated") {
    router.push("/dashboard");
    return <></>;
  }
  return <HomePage></HomePage>;
}
