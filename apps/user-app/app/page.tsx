"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { AppBar } from "@repo/ui/appBar";
export default function Home() {
  const user = useSession().data?.user;
  const session = useSession();
  console.log("user is dfd ", user);

  return (
    <div className="">
      <button
        onClick={() => {
          signIn();
        }}
        className="m-4"
      >
        signIn
      </button>
      <button
        onClick={() => {
          signOut();
        }}
      >
        signOut
      </button>
      <div>{JSON.stringify(session)}</div>
    </div>
  );
}
