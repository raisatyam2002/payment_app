"use server";
import db from "@repo/db/client";
import bcrypt from "bcrypt";
export async function SignUp({
  name,
  phoneNumber,
  password,
}: {
  name: string | undefined;
  phoneNumber: string | undefined;
  password: string | undefined;
}) {
  console.log(name, " ", phoneNumber, " ", password);
  try {
    if (!name || !phoneNumber || !password) {
      return { error: "Credentials are invalid" };
    }

    const existingUser = await db.user.findFirst({
      where: {
        phone: phoneNumber,
      },
    });
    console.log("exisitn user ", existingUser);
    if (existingUser) {
      return { error: "Phone number already exists" };
    } else {
      const hashedPassword = await bcrypt.hash(password || "", 10);
      await db.user.create({
        data: {
          name: name,
          phone: phoneNumber,
          password: hashedPassword,
        },
      });
      return {
        message: "User created successfully",
      };
    }
  } catch (error: any) {
    console.error("Error details:", error);
    return {
      error: error.message || "An error occurred while signing up",
    };
  }
}
