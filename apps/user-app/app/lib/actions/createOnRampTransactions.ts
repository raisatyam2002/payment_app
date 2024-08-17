"use server";
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session?.user?.id) {
    return {
      message: "Unauthenticated User",
    };
  } else {
    const token = (Math.random() * 1000).toString();
    await db.onRampTransaction.create({
      data: {
        provider,
        userId: Number(session.user.id),
        amount: amount * 100,
        status: "Processing",
        startTime: new Date(),
        token: token,
      },
    });
    return {
      message: "Done",
    };
  }
}
