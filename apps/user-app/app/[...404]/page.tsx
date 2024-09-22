"use client";
import React from "react";
import Image from "next/image";
import bg404 from "../img/ 404(1).png";
import bg from "../img/404(2).png";
import button from "../img/Button.png";
import { useRouter } from "next/navigation";
export default function custom404Page() {
  const router = useRouter();
  return (
    <div className="text-center pt-12">
      <h1 className="text-6xl font-extrabold mb-3">Oops!</h1>
      <h1 className="text-2xl font-semibold">You are lost</h1>
      <div className="flex flex-col h-max items-center mt-20 relative">
        <Image src={bg404} alt="404" className="absolute"></Image>
        <Image src={bg} alt="4041" className="absolute top-12"></Image>
      </div>
      <div className="flex justify-center mt-96">
        <Image
          src={button}
          alt="button"
          onClick={() => {
            router.push("/dashboard");
          }}
          className="cursor-pointer"
        ></Image>
      </div>
    </div>
  );
}
