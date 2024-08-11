import express from "express";
import { Request, Response } from "express";
import db from "@repo/db/client";
const app = express();
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "hi from server",
  });
});
app.post("/hdfcWebhook", async (req, res) => {
  //TODO: Add zod validation here?
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  try {
    await db.balance.update({
      where: {
        userId: paymentInformation.userId,
      },
      data: {
        amount: {
          increment: paymentInformation.amount,
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
    });
  } catch (error) {
    console.log(error);

    res.status(411).json({
      message: "not captured",
    });
  }
});
app.listen(3002, () => {
  console.log("server is running on PORT 3002");
});
