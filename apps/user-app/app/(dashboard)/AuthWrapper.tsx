"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";
export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status == "loading") {
    return <Loader></Loader>;
  }
  if (!session?.user) {
    router.push("/auth/login");
    return null;
  }
  return <>{children}</>;
}
