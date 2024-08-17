import AddMoneyCard from "../../components/AddMoneyCard";
import { BalanceCard } from "../../components/BalanceCard";
import { OnRampTransactions } from "../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import db from "@repo/db/client";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await db.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}
async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  console.log("session id ", session?.user?.id);

  const txns = await db.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return txns.map((t) => ({
    id: t.id,
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}
export default async function () {
  const transactions = await getOnRampTransactions();
  // console.log("transactions are  ", transactions);
  const balance = await getBalance();

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 pl-4 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoneyCard />
        </div>
        <div>
          <BalanceCard
            amount={balance.amount}
            locked={balance.locked}
          ></BalanceCard>
          <div className="pt-4">
            <OnRampTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
