/*
  Warnings:

  - You are about to drop the column `idCategory` on the `Product` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "idCategory",
ADD COLUMN     "category_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
