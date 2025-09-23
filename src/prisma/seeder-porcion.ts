import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedPorcion(): Promise<void> {
  // Limpiar tabla
  await prisma.porcion.deleteMany();

  // Insertar porciones con IDs fijos
  await prisma.porcion.createMany({
    data: [
      { id: 1, nombre: 'Panceta' },
      { id: 2, nombre: 'Carne' },
      { id: 3, nombre: 'Combinado' },
      { id: 4, nombre: 'Cerdo' },
      { id: 5, nombre: 'Pavo' },
    ],
  });

  console.log('✅ Porciones insertadas con IDs');

  // Cerrar conexión
  await prisma.$disconnect();
}

// Ejecutar con manejo de errores
seedPorcion().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
