"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";
export default async function lastFourWeeks() {
  const session = await getServerSession(authOptions);
  const transactions = db.balanceHistory.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
    orderBy: {
      Date: "asc",
    },
  });
  return transactions;
}
