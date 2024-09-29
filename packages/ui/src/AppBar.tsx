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
  callbackUrl: string;
}
export const AppBar = ({ signIn, signOut, user, callbackUrl }: AppBarProps) => {
  function handleSignIn() {
    signIn();
  }
  async function handleSignOut() {
    await signOut();
    window.location.href = callbackUrl;
  }
  return (
    <div className="flex justify-between p-4 border z-30 bg-gray-50">
      <div className="text-xl pt-2">PAYMENT APP</div>
      {user ? (
        <button
          onClick={async () => {
            await handleSignOut();
          }}
          className="border bg-gray-800 hover:bg-gray-950 text-white sm:p-2 mr-4 sm:mr-0 rounded-md w-20"
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
