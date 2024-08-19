import React from "react";
import { Button } from "./button";
interface AppBarProps {
  signIn: () => void;
  signOut: () => void;
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}
export const AppBar = ({ signIn, signOut, user }: AppBarProps) => {
  function handleSignIn() {
    signIn();
  }
  async function handleSignOut() {
    await signOut();
  }
  return (
    <div className="flex justify-between p-4 border">
      <div className="text-xl pt-2">PAYMENT APP</div>
      {user ? (
        <button
          onClick={async () => {
            await handleSignOut();

            window.location.href = "http://localhost:3000";
          }}
          className="border bg-gray-800 hover:bg-gray-950 text-white p-2 rounded-md w-20"
        >
          signOut
        </button>
      ) : (
        <button
          onClick={() => {
            handleSignIn();
          }}
          className="border bg-gray-800 hover:bg-gray-950 text-white p-2 rounded-md w-20"
        >
          signIn
        </button>
      )}
    </div>
  );
};
