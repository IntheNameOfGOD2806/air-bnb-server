-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "isTour" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "isTour" BOOLEAN NOT NULL DEFAULT false;
