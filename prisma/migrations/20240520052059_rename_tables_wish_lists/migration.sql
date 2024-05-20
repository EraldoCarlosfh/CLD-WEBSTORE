/*
  Warnings:

  - You are about to drop the `_wishlistProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wishlists` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_wishlistProducts" DROP CONSTRAINT "_wishlistProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_wishlistProducts" DROP CONSTRAINT "_wishlistProducts_B_fkey";

-- DropForeignKey
ALTER TABLE "wishlists" DROP CONSTRAINT "wishlists_userId_fkey";

-- DropTable
DROP TABLE "_wishlistProducts";

-- DropTable
DROP TABLE "wishlists";

-- CreateTable
CREATE TABLE "wishLists" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "wishLists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_wishListProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_wishListProducts_AB_unique" ON "_wishListProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_wishListProducts_B_index" ON "_wishListProducts"("B");

-- AddForeignKey
ALTER TABLE "wishLists" ADD CONSTRAINT "wishLists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_wishListProducts" ADD CONSTRAINT "_wishListProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_wishListProducts" ADD CONSTRAINT "_wishListProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "wishLists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
