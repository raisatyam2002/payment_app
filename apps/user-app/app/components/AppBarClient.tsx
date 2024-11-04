"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { AppBar } from "@repo/ui/appBar";
import { useRouter } from "next/navigation";
export const AppBarClient = () => {
  const session = useSession();
  const router = useRouter();
  const nextAuthUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
  console.log("scsd ", nextAuthUrl);
  return (
    <div className="fixed top-0 left-0 w-full  ;  ">
      <AppBar
        signIn={signIn}
        signOut={() => signOut()}
        user={session.data?.user}
        callbackUrl={`${nextAuthUrl}/auth/login`}
      ></AppBar>
    </div>
  );
};
