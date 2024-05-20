/*
  Warnings:

  - You are about to drop the `WishList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_WishListProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_userId_fkey";

-- DropForeignKey
ALTER TABLE "_WishListProducts" DROP CONSTRAINT "_WishListProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_WishListProducts" DROP CONSTRAINT "_WishListProducts_B_fkey";

-- DropTable
DROP TABLE "WishList";

-- DropTable
DROP TABLE "_WishListProducts";

-- CreateTable
CREATE TABLE "wishlists" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "wishlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_wishlistProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_wishlistProducts_AB_unique" ON "_wishlistProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_wishlistProducts_B_index" ON "_wishlistProducts"("B");

-- AddForeignKey
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_wishlistProducts" ADD CONSTRAINT "_wishlistProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_wishlistProducts" ADD CONSTRAINT "_wishlistProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "wishlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
