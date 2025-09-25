// public.entity.ts
import type {
  Adicional,
  EstadoPedido,
  Categoria,
  Ingrediente,
  Tamano,
  Opciones,
  Producto,
} from '@prisma/client';

export type AdminPanelEntity =
  | Adicional
  | EstadoPedido
  | Categoria
  | Ingrediente
  | Tamano
  | Opciones
  | Producto;

// Solo exporta tipos, no valores
