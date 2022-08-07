/*
  Warnings:

  - You are about to drop the column `featured` on the `Testimonial` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Testimonial` DROP COLUMN `featured`,
    ADD COLUMN `hidden` BOOLEAN NOT NULL DEFAULT false;
