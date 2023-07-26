-- CreateTable
CREATE TABLE "Pixel" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "currentColor" TEXT NOT NULL,

    CONSTRAINT "Pixel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EditPixel" (
    "id" TEXT NOT NULL,
    "pixelId" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "EditPixel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EditPixel" ADD CONSTRAINT "EditPixel_pixelId_fkey" FOREIGN KEY ("pixelId") REFERENCES "Pixel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EditPixel" ADD CONSTRAINT "EditPixel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
