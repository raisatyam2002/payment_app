import React from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
interface AppBarProps {
  signIn: () => void;
  signOut: () => void;
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  callbackUrl: string;
}
export const AppBar = ({ signIn, signOut, user, callbackUrl }: AppBarProps) => {
  const router = useRouter();
  function handleSignIn() {
    signIn();
  }
  async function handleSignOut() {
    await signOut();
    window.location.href = callbackUrl;
  }
  return (
    <div className="flex justify-between p-4 border z-30 bg-gray-50">
      <div
        className="text-3xl font-extrabold pt-2 cursor-pointer z-50"
        style={{
          background:
            "linear-gradient(to bottom right, #60269E 0%, #03CFFC 35%, #B977FF 77%, #6508C9 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        onClick={() => {
          router.push("/");
        }}
      >
        EASY PAY
      </div>
      {user ? (
        <button
          onClick={async () => {
            await handleSignOut();
          }}
          className="border bg-gray-800 hover:bg-gray-950 text-white sm:p-2 mr-4 sm:mr-0 rounded-md w-24"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => {
            handleSignIn();
          }}
          className="border bg-gray-800 hover:bg-gray-950 text-white p-2 rounded-md w-20"
        >
          Sign in
        </button>
      )}
    </div>
  );
};
