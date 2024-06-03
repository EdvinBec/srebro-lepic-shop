/*
  Warnings:

  - You are about to drop the column `AvailableSizes` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Category` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `WeightInGrams` on the `Product` table. All the data in the column will be lost.
  - Added the required column `availableSizes` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weightInGrams` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "priceInCents" REAL NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "weightInGrams" REAL NOT NULL,
    "availableSizes" TEXT NOT NULL,
    "isAvailabileForPurchase" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("createdAt", "id", "image", "isAvailabileForPurchase", "name", "priceInCents", "updatedAt") SELECT "createdAt", "id", "image", "isAvailabileForPurchase", "name", "priceInCents", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check("Product");
PRAGMA foreign_keys=ON;
