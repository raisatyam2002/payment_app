import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      // TODO: User credentials type from next-aut
      async authorize(credentials: any) {
        console.log("debug chekc", credentials.phone);

        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        console.log("debug 2");

        const existingUser = await db.user.findFirst({
          where: {
            phone: credentials.phone,
          },
        });
        if (!existingUser) {
          console.log("User not found.");
          throw new Error("User not found. Please check your phone number.");
        }

        console.log("debug 3");

        console.log("hey ", existingUser.password, " ", hashedPassword);

        const passwordValidation = await bcrypt.compare(
          credentials.password,
          existingUser.password
        );
        if (!passwordValidation) {
          console.log("Invalid password.");
          throw new Error("Invalid password. Please try again.");
        }

        return {
          id: existingUser.id.toString(),
          phone: existingUser.phone,
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: any) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
   
  },
};
