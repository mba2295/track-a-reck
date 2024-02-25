-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `assignedToId` VARCHAR(255) NULL;

-- CreateIndex
CREATE INDEX `idx_assignedToId` ON `Ticket`(`assignedToId`);

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_assignedToId_fkey` FOREIGN KEY (`assignedToId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
