"use client";
import React from "react";
import { useRouter } from "next/navigation";
export default function ({
  icon,
  title,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  href: string;
}) {
  const router = useRouter();
  return (
    <div
      className="flex gap-2 p-2 pl-8 cursor-pointer"
      onClick={() => {
        router.push(href);
      }}
    >
      <div>{icon}</div>
      <div>{title}</div>
    </div>
  );
}
