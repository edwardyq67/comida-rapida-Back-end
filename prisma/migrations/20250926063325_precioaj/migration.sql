/*
  Warnings:

  - You are about to drop the `pedido_ingredientes` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `precio` on table `Producto` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."pedido_ingredientes" DROP CONSTRAINT "pedido_ingredientes_ingrediente_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."pedido_ingredientes" DROP CONSTRAINT "pedido_ingredientes_pedidoItem_id_fkey";

-- AlterTable
ALTER TABLE "public"."Producto" ALTER COLUMN "precio" SET NOT NULL;

-- DropTable
DROP TABLE "public"."pedido_ingredientes";
