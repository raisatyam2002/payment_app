"use server";
import db from "@repo/db/client";
export async function checkTransactionStatus(token: string) {
  const transaction = await db.onRampTransaction.findUnique({
    where: {
      token: token,
    },
  });

  return transaction?.status;
}
