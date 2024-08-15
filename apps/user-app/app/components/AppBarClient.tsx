"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { AppBar } from "@repo/ui/appBar";
import { useRouter } from "next/navigation";
export const AppBarClient = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="fixed top-0 left-0 w-full  z-50;  ">
      <AppBar
        signIn={signIn}
        signOut={signOut}
        user={session.data?.user}
      ></AppBar>
    </div>
  );
};
