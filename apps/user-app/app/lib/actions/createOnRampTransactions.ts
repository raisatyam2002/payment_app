"use server";
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import sjcl from "sjcl";

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
    const password = "your-encryption-password";
    const data = {
      user_identifier: session.user.id,
      token: token,
      amount: amount,
    };
    console.log("DATA ", data);

    // Encrypt the object
    const encryptedData: string = sjcl.encrypt(
      password,
      JSON.stringify(data)
    ) as unknown as string;

    console.log("Encrypted Data:", encryptedData);

    const urlSafeEncryptedData = encodeURIComponent(encryptedData);
    const decryptedDataString = decodeURIComponent(urlSafeEncryptedData);
    console.log("decrypt string ", decryptedDataString);

    const encryptedData2 = JSON.parse(decryptedDataString);
    console.log("encyotDATA2 ", encryptedData2);

    // Proceed with decryption using sjcl or your preferred method
    const decryptedData = sjcl.decrypt(
      password,
      JSON.stringify(encryptedData2)
    );
    console.log(JSON.parse(decryptedData));
    return {
      queryParams: urlSafeEncryptedData || "",
      token: token,
    };
  }
}
