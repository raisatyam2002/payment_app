import express from "express";
import { Request, Response } from "express";
import db from "@repo/db/client";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "hi from server",
  });
});
app.post("/hdfcWebhook", async (req, res) => {
  //TODO: Add zod validation here?
  console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body);

  console.log("req body from request ", req.body);

  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  try {
    await db.balance.upsert({
      where: {
        userId: Number(paymentInformation.userId),
      },
      create: {
        userId: Number(paymentInformation.userId),
        amount: paymentInformation.amount * 100,
        locked: 200,
      },
      update: {
        amount: {
          increment: paymentInformation.amount * 100,
        },
      },
    });
    await db.onRampTransaction.update({
      where: {
        token: paymentInformation.token,
      },
      data: {
        status: "Success",
      },
    });
    res.status(200).json({
      message: "captured",
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(401).json({
      message: "not captured",
    });
  }
});
app.listen(3002, () => {
  console.log("server is running on PORT 3002");
});
