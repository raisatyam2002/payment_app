"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import Loader from "./components/Loader";
import HomePage from "./components/Home";
export default function Home() {
  return <HomePage></HomePage>;
}
