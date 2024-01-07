/*
  Warnings:

  - You are about to drop the column `assignedToId` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_assignedToId_fkey`;

-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_createdById_fkey`;

-- AlterTable
ALTER TABLE `ticket` DROP COLUMN `assignedToId`,
    DROP COLUMN `createdById`;

-- DropTable
DROP TABLE `user`;
