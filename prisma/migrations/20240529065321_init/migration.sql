/*
  Warnings:

  - A unique constraint covering the columns `[session]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `session` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `session` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_session_key` ON `user`(`session`);
