import React from "react";
import Image from "next/image";
import underConstruction from "../../img/underConstruction.png";
export default function () {
  return (
    <div className="w-full p-5 sm:border-2 sm: border-gray-100">
      <h1 className="text-4xl font-extrabold mb-3 text-center ">
        This Feature is Under Construction
      </h1>
      <div className="flex justify-center h-max items-center ">
        <Image
          className="h-fit"
          src={underConstruction}
          alt="unerConstruction"
        ></Image>
      </div>
    </div>
  );
}
