"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "./components/Loader";
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      router.push("/dashboard");
    } else {
      signIn(undefined, { callbackUrl: window.location.href });
    }
  }, [session, status, router]);

  return <Loader></Loader>;
}
