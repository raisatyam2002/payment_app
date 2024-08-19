-- CreateTable
CREATE TABLE "P2P" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "P2P_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "P2P_senderId_key" ON "P2P"("senderId");

-- CreateIndex
CREATE UNIQUE INDEX "P2P_receiverId_key" ON "P2P"("receiverId");

-- AddForeignKey
ALTER TABLE "P2P" ADD CONSTRAINT "P2P_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2P" ADD CONSTRAINT "P2P_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
