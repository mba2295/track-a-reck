/*
  Warnings:

  - You are about to drop the column `assignedToId` on the `ticket` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_assignedToId_fkey`;

-- AlterTable
ALTER TABLE `ticket` DROP COLUMN `assignedToId`,
    ADD COLUMN `assignedToUserId` VARCHAR(255) NULL;

-- CreateIndex
CREATE INDEX `idx_assignedToId` ON `Ticket`(`assignedToUserId`);

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_assignedToUserId_fkey` FOREIGN KEY (`assignedToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
