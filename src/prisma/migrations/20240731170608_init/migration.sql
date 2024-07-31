/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Track` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[href]` on the table `Track` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "AlbumType" AS ENUM ('ALBUM', 'SINGLE', 'COMPILATION');

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "discNumber" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "href" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "trackNumber" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Album" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "AlbumType" NOT NULL DEFAULT 'SINGLE',
    "totalTracks" INTEGER NOT NULL DEFAULT 0,
    "cover" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "genres" TEXT[],

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AlbumToArtist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AlbumToTrack" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Album_name_key" ON "Album"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumToArtist_AB_unique" ON "_AlbumToArtist"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumToArtist_B_index" ON "_AlbumToArtist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumToTrack_AB_unique" ON "_AlbumToTrack"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumToTrack_B_index" ON "_AlbumToTrack"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Track_name_key" ON "Track"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Track_href_key" ON "Track"("href");

-- AddForeignKey
ALTER TABLE "_AlbumToArtist" ADD CONSTRAINT "_AlbumToArtist_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToArtist" ADD CONSTRAINT "_AlbumToArtist_B_fkey" FOREIGN KEY ("B") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToTrack" ADD CONSTRAINT "_AlbumToTrack_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToTrack" ADD CONSTRAINT "_AlbumToTrack_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
