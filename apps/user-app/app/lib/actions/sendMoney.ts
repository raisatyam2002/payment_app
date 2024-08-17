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
  const session = await getServerSession(authOptions);
  const senderId = Number(session?.user?.id);
  const receiverId = await getReciverId(number);
  if (!receiverId) {
    return {
      message: "User not found",
    };
  }
  const tx = await db.$transaction(async (tx) => {
    const senderBalance = await tx.balance.findUnique({
      where: {
        userId: senderId,
      },
    });
    if (!senderBalance || senderBalance.amount < amount) {
      throw new Error("Insufficient funds");
    } else {
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
    }
  });
  console.log("tx is ", tx);

  return {
    message: "payment succesfull",
  };
}
