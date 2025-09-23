/*
  Warnings:

  - You are about to drop the `productos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."pedido_items" DROP CONSTRAINT "pedido_items_producto_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."producto_ingredientes" DROP CONSTRAINT "producto_ingredientes_producto_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."producto_tamanos" DROP CONSTRAINT "producto_tamanos_producto_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."productos" DROP CONSTRAINT "productos_categoria_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."productos" DROP CONSTRAINT "productos_porcion_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."productos" DROP CONSTRAINT "productos_tamano_id_fkey";

-- DropTable
DROP TABLE "public"."productos";

-- CreateTable
CREATE TABLE "public"."Producto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "imagen" TEXT,
    "precio" DOUBLE PRECISION NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "categoria_id" INTEGER NOT NULL,
    "tamano_id" INTEGER,
    "porcion_id" INTEGER,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Producto" ADD CONSTRAINT "Producto_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "public"."categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Producto" ADD CONSTRAINT "Producto_tamano_id_fkey" FOREIGN KEY ("tamano_id") REFERENCES "public"."tamanos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Producto" ADD CONSTRAINT "Producto_porcion_id_fkey" FOREIGN KEY ("porcion_id") REFERENCES "public"."porciones"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."producto_tamanos" ADD CONSTRAINT "producto_tamanos_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "public"."Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."producto_ingredientes" ADD CONSTRAINT "producto_ingredientes_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "public"."Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pedido_items" ADD CONSTRAINT "pedido_items_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "public"."Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
