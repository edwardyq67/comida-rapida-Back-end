-- CreateTable
CREATE TABLE "public"."categorias" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "imagen" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."productos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "imagen" TEXT,
    "precio_base" DOUBLE PRECISION NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "categoria_id" INTEGER NOT NULL,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tamanos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "tamanos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ingredientes" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "ingredientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."adicionales" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "imagen" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "adicionales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."producto_tamanos" (
    "id" SERIAL NOT NULL,
    "producto_id" INTEGER NOT NULL,
    "tamano_id" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "producto_tamanos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."producto_ingredientes" (
    "id" SERIAL NOT NULL,
    "producto_id" INTEGER NOT NULL,
    "ingrediente_id" INTEGER NOT NULL,
    "opcional" BOOLEAN NOT NULL DEFAULT false,
    "por_defecto" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "producto_ingredientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pedidos" (
    "id" SERIAL NOT NULL,
    "cliente" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "total" DOUBLE PRECISION NOT NULL,
    "notas" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pedido_items" (
    "id" SERIAL NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "producto_id" INTEGER NOT NULL,
    "productoTamano_id" INTEGER,
    "cantidad" INTEGER NOT NULL DEFAULT 1,
    "precio_unitario" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "observaciones" TEXT,
    "tamanoId" INTEGER,

    CONSTRAINT "pedido_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pedido_ingredientes" (
    "id" SERIAL NOT NULL,
    "pedidoItem_id" INTEGER NOT NULL,
    "ingrediente_id" INTEGER NOT NULL,
    "incluido" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "pedido_ingredientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pedido_adicionales" (
    "id" SERIAL NOT NULL,
    "pedidoItem_id" INTEGER NOT NULL,
    "adicional_id" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 1,
    "precio_unitario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "pedido_adicionales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nombre_key" ON "public"."categorias"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "tamanos_nombre_key" ON "public"."tamanos"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "ingredientes_nombre_key" ON "public"."ingredientes"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "producto_tamanos_producto_id_tamano_id_key" ON "public"."producto_tamanos"("producto_id", "tamano_id");

-- CreateIndex
CREATE UNIQUE INDEX "producto_ingredientes_producto_id_ingrediente_id_key" ON "public"."producto_ingredientes"("producto_id", "ingrediente_id");

-- AddForeignKey
ALTER TABLE "public"."productos" ADD CONSTRAINT "productos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "public"."categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."producto_tamanos" ADD CONSTRAINT "producto_tamanos_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "public"."productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."producto_tamanos" ADD CONSTRAINT "producto_tamanos_tamano_id_fkey" FOREIGN KEY ("tamano_id") REFERENCES "public"."tamanos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."producto_ingredientes" ADD CONSTRAINT "producto_ingredientes_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "public"."productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."producto_ingredientes" ADD CONSTRAINT "producto_ingredientes_ingrediente_id_fkey" FOREIGN KEY ("ingrediente_id") REFERENCES "public"."ingredientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pedido_items" ADD CONSTRAINT "pedido_items_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "public"."pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pedido_items" ADD CONSTRAINT "pedido_items_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "public"."productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pedido_items" ADD CONSTRAINT "pedido_items_productoTamano_id_fkey" FOREIGN KEY ("productoTamano_id") REFERENCES "public"."producto_tamanos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pedido_items" ADD CONSTRAINT "pedido_items_tamanoId_fkey" FOREIGN KEY ("tamanoId") REFERENCES "public"."tamanos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pedido_ingredientes" ADD CONSTRAINT "pedido_ingredientes_pedidoItem_id_fkey" FOREIGN KEY ("pedidoItem_id") REFERENCES "public"."pedido_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pedido_ingredientes" ADD CONSTRAINT "pedido_ingredientes_ingrediente_id_fkey" FOREIGN KEY ("ingrediente_id") REFERENCES "public"."ingredientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pedido_adicionales" ADD CONSTRAINT "pedido_adicionales_pedidoItem_id_fkey" FOREIGN KEY ("pedidoItem_id") REFERENCES "public"."pedido_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pedido_adicionales" ADD CONSTRAINT "pedido_adicionales_adicional_id_fkey" FOREIGN KEY ("adicional_id") REFERENCES "public"."adicionales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
