/*
  Warnings:

  - You are about to drop the column `precio_base` on the `productos` table. All the data in the column will be lost.
  - Added the required column `precio` to the `productos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."productos" DROP COLUMN "precio_base",
ADD COLUMN     "porcion_id" INTEGER,
ADD COLUMN     "precio" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tamano_id" INTEGER;

-- CreateTable
CREATE TABLE "public"."porciones" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "porciones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "porciones_nombre_key" ON "public"."porciones"("nombre");

-- AddForeignKey
ALTER TABLE "public"."productos" ADD CONSTRAINT "productos_tamano_id_fkey" FOREIGN KEY ("tamano_id") REFERENCES "public"."tamanos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."productos" ADD CONSTRAINT "productos_porcion_id_fkey" FOREIGN KEY ("porcion_id") REFERENCES "public"."porciones"("id") ON DELETE SET NULL ON UPDATE CASCADE;
