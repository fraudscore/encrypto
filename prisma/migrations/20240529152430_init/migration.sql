/*
  Warnings:

  - You are about to drop the column `sessiontoken` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `user_sessiontoken_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `sessiontoken`;
