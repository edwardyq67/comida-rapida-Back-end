/*
  Warnings:

  - You are about to drop the column `estado` on the `pedidos` table. All the data in the column will be lost.
  - Added the required column `estado_id` to the `pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."pedidos" DROP COLUMN "estado",
ADD COLUMN     "estado_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."estado_pedidos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "estado_pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "estado_pedidos_nombre_key" ON "public"."estado_pedidos"("nombre");

-- AddForeignKey
ALTER TABLE "public"."pedidos" ADD CONSTRAINT "pedidos_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "public"."estado_pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
