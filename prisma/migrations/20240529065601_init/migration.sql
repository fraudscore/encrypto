/*
  Warnings:

  - You are about to drop the column `session` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessiontoken]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessiontoken` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `user_session_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `session`,
    ADD COLUMN `sessiontoken` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_sessiontoken_key` ON `user`(`sessiontoken`);
