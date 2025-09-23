// src/prisma/seeder-producto.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedProducto(): Promise<void> {
  // Limpiar tablas
  await prisma.productoIngrediente.deleteMany();
  await prisma.producto.deleteMany();

  // 🥪 Pan con Chicharrón
  await prisma.producto.create({
    data: {
      id: 1,
      nombre: 'Pan con Chicharrón',
      descripcion: 'Pan con chicharrón, camote frito y salsa criolla',
      imagen: 'pan-chicharron.jpg',
      precio: 12.5,
      categoria_id: 1,
      tamano_id: 3,
      porcion_id: 1,
      ingredientes: {
        create: [
          { ingrediente_id: 1, opcional: true, por_defecto: true },
          { ingrediente_id: 2, opcional: true, por_defecto: true },
          { ingrediente_id: 3, opcional: true, por_defecto: true },
        ],
      },
    },
  });

  // 🥪 Pan con Hot Dog
  await prisma.producto.create({
    data: {
      id: 2,
      nombre: 'Pan con Hot Dog',
      descripcion: 'Hot dog clásico con papitas al hilo y lechuga',
      imagen: 'pan-hotdog.jpg',
      precio: 8.0,
      categoria_id: 1,
      tamano_id: 3,
      porcion_id: 2,
      ingredientes: {
        create: [
          { ingrediente_id: 4, opcional: true, por_defecto: true },
          { ingrediente_id: 5, opcional: true, por_defecto: true },
        ],
      },
    },
  });

  // ☕ Café
  await prisma.producto.create({
    data: {
      id: 3,
      nombre: 'Café',
      descripcion: 'Café recién hecho',
      imagen: 'cafe.jpg',
      precio: 5.0,
      categoria_id: 2,
      tamano_id: 2,
      ingredientes: {
        create: [
          { ingrediente_id: 6, opcional: true, por_defecto: true },
          { ingrediente_id: 7, opcional: true, por_defecto: true },
          { ingrediente_id: 8, opcional: true, por_defecto: true },
        ],
      },
    },
  });

  // 🥤 Jugo de Fresa
  await prisma.producto.create({
    data: {
      id: 4,
      nombre: 'Jugo de Fresa',
      descripcion: 'Jugo natural de fresa',
      imagen: 'jugo-fresa.jpg',
      precio: 7.5,
      categoria_id: 3,
      tamano_id: 2,
      ingredientes: {
        create: [
          { ingrediente_id: 6, opcional: true, por_defecto: true },
          { ingrediente_id: 7, opcional: true, por_defecto: false },
          { ingrediente_id: 8, opcional: true, por_defecto: false },
        ],
      },
    },
  });

  console.log(
    '✅ Productos insertados con ingredientes directamente en pivote',
  );

  await prisma.$disconnect();
}

// Ejecutar el seeder
seedProducto().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
