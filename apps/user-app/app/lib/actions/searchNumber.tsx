"use server";
import db from "@repo/db/client";
export default async function searchNumber(number: number) {
  const allNumbers = await db.user.findMany({
    where: {
      phone: {
        startsWith: String(number),
      },
    },
    select: {
      phone: true,
    },
  });
  console.log("numbers ", allNumbers);
  const matchingPhoneNumber = allNumbers.map((user) => user.phone);
  return matchingPhoneNumber;
}
