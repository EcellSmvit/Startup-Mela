-- CreateTable
CREATE TABLE "_Teammates" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_Teammates_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Teammates_B_index" ON "_Teammates"("B");

-- AddForeignKey
ALTER TABLE "_Teammates" ADD CONSTRAINT "_Teammates_A_fkey" FOREIGN KEY ("A") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Teammates" ADD CONSTRAINT "_Teammates_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
