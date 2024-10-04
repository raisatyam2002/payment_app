"use server";
import { getServerSession } from "next-auth";
import db from "@repo/db/client";
import { authOptions } from "../auth";
interface P2PTransactionsInterface {
  id: number;
  senderId: number;
  receiverId: number;
  amount: number;
  time: Date;
  receiverNumber: string;
}
export async function getP2PTransactions(): Promise<
  P2PTransactionsInterface[]
> {
  const session = await getServerSession(authOptions);
  const tx = await db.p2P.findMany({
    where: {
      senderId: Number(session?.user?.id),
    },
    include: {
      receiver: {
        select: {
          phone: true,
        },
      },
    },
  });
  return tx.map((t) => {
    return {
      id: t.id,
      senderId: t.senderId,
      receiverId: t.receiverId,
      amount: t.amount,
      time: t.startTime,
      receiverNumber: t.receiver.phone,
    };
  });
}
