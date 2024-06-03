/*
  Warnings:

  - You are about to alter the column `WeightInGrams` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `priceInCents` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "priceInCents" REAL NOT NULL,
    "image" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "WeightInGrams" REAL NOT NULL,
    "AvailableSizes" TEXT NOT NULL,
    "isAvailabileForPurchase" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("AvailableSizes", "Category", "Description", "WeightInGrams", "createdAt", "id", "image", "isAvailabileForPurchase", "name", "priceInCents", "updatedAt") SELECT "AvailableSizes", "Category", "Description", "WeightInGrams", "createdAt", "id", "image", "isAvailabileForPurchase", "name", "priceInCents", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check("Product");
PRAGMA foreign_keys=ON;
