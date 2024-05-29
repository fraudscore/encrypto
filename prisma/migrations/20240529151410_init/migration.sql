/*
  Warnings:

  - You are about to drop the column `browser_agend` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `ip_address` on the `user` table. All the data in the column will be lost.
  - Added the required column `ip` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `useragent` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `browser_agend`,
    DROP COLUMN `ip_address`,
    ADD COLUMN `ip` VARCHAR(191) NOT NULL,
    ADD COLUMN `useragent` VARCHAR(191) NOT NULL;
