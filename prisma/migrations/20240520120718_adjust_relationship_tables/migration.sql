/*
  Warnings:

  - You are about to drop the `_wishListProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wishLists` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_wishListProducts" DROP CONSTRAINT "_wishListProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_wishListProducts" DROP CONSTRAINT "_wishListProducts_B_fkey";

-- DropForeignKey
ALTER TABLE "wishLists" DROP CONSTRAINT "wishLists_userId_fkey";

-- DropTable
DROP TABLE "_wishListProducts";

-- DropTable
DROP TABLE "wishLists";

-- CreateTable
CREATE TABLE "wishListProducts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "wishListProducts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wishListProducts" ADD CONSTRAINT "wishListProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishListProducts" ADD CONSTRAINT "wishListProducts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
