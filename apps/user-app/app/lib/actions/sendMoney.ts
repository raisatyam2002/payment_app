"use server";
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
async function getReciverId(number: number) {
  const receiver = await db.user.findFirst({
    where: {
      phone: String(number),
    },
  });
  console.log(receiver);
  return receiver?.id;
}
export default async function sendMoney({
  number,
  amount,
}: {
  number: number;
  amount: number;
}) {
  amount = amount * 100;
  const session = await getServerSession(authOptions);
  const senderId = Number(session?.user?.id);
  const receiverId = await getReciverId(number);
  if (!receiverId) {
    return {
      success: false,
      message: "Peer not found",
    };
  }
  if (senderId == receiverId) {
    return {
      success: false,
      message: "Cannot send money to yourself",
    };
  }
  const tx = await db.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${senderId} FOR UPDATE`;
    const senderBalance = await tx.balance.findUnique({
      where: {
        userId: senderId,
      },
    });
    if (!senderBalance || senderBalance.amount < amount) {
      throw new Error("Insufficient funds");
    } else {
      // await new Promise((r) => setTimeout(r, 4000));
      await tx.balance.update({
        where: {
          userId: senderId,
        },
        data: {
          amount: {
            decrement: amount,
          },
        },
      });
      await tx.balance.upsert({
        where: {
          userId: receiverId,
        },
        create: {
          userId: receiverId,
          amount: amount,
          locked: 200,
        },
        update: {
          amount: {
            increment: amount,
          },
        },
      });
      await tx.p2P.create({
        data: {
          senderId: senderId,
          receiverId: receiverId,
          amount: amount,
          startTime: new Date(),
        },
      });
    }
  });
  console.log("tx is ", tx);

  return {
    success: true,
    message: "payment succesfull",
  };
}
