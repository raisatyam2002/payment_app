// "use client";
// import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";

// export function Protected({ children }: { children: React.ReactNode }) {
//   const user = useSession().data?.user;
//   if (user) {
//     return <div>{children}</div>;
//   } else {
//     redirect("/api/auth/signin");
//     return null;
//   }
// }
