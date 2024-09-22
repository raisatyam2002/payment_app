"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status == "loading") {
    return <div>loading</div>;
  }
  if (session?.user) {
    router.push("/dashboard");
    return null;
  }
  return <>{children}</>;
}
