import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border p-4 relative" style={{ zIndex: "-1" }}>
      <h1
        className="text-xl border-b  "
        style={{
          position: "sticky",
          top: "0",
        }}
      >
        {title}
      </h1>
      <div className="mt-5">{children}</div>
    </div>
  );
}
