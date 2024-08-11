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
        console.log("debug ", credentials.phone);

        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        console.log("debug 2");

        const existingUser = await db.user.findFirst({
          where: {
            phone: credentials.phone,
          },
        });
        console.log("debug 3");
        if (existingUser) {
          console.log("hey ", existingUser.password, " ", hashedPassword);

          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              phone: existingUser.phone,
            };
          }
          return null;
        }
        try {
          const newUser = await db.user.create({
            data: {
              phone: credentials.phone,
              password: hashedPassword,
            },
          });
          return {
            id: newUser.id.toString(),
            phone: credentials.phone,
          };
        } catch (error) {
          //   console.log("debug 2");

          console.log(error);
        }
        return null;
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
};
