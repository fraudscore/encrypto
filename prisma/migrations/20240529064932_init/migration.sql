/*
  Warnings:

  - Added the required column `browser_agend` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ip_address` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `browser_agend` VARCHAR(191) NOT NULL,
    ADD COLUMN `ip_address` VARCHAR(191) NOT NULL,
    ADD COLUMN `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
