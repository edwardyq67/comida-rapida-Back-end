import {
  Adicional,
  EstadoPedido,
  Categoria,
  Ingrediente,
  Tamano,
  Porcion,
  Producto,
} from '@prisma/client';

export type AdminPanelEntity =
  | Adicional
  | EstadoPedido
  | Categoria
  | Ingrediente
  | Tamano
  | Porcion
  | Producto;
