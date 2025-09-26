-- CreateTable
CREATE TABLE "public"."pedido_ingredientes" (
    "id" SERIAL NOT NULL,
    "pedidoItem_id" INTEGER NOT NULL,
    "ingrediente_id" INTEGER NOT NULL,
    "incluido" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "pedido_ingredientes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."pedido_ingredientes" ADD CONSTRAINT "pedido_ingredientes_ingrediente_id_fkey" FOREIGN KEY ("ingrediente_id") REFERENCES "public"."ingredientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pedido_ingredientes" ADD CONSTRAINT "pedido_ingredientes_pedidoItem_id_fkey" FOREIGN KEY ("pedidoItem_id") REFERENCES "public"."pedido_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
