/*
  Warnings:

  - You are about to drop the column `log_updatedFields` on the `log` table. All the data in the column will be lost.
  - Added the required column `fk_log_use_id` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `log` DROP COLUMN `log_updatedFields`,
    ADD COLUMN `fk_log_use_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_fk_log_use_id_fkey` FOREIGN KEY (`fk_log_use_id`) REFERENCES `User`(`use_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
