import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PublicPanelService {
  constructor(private prisma: PrismaService) {}

  // ================= ADICIONAL =================
  async findAllAdicional() {
    const adicionales = await this.prisma.adicional.findMany({
      where: { activo: true },
    });

    return adicionales.map((adicional) => ({
      id: adicional.id,
      nombre: adicional.nombre,
      precio: adicional.precio,
      imagen: adicional.imagen,
    }));
  }

  async findOneAdicional(id: number) {
    const adicional = await this.prisma.adicional.findUnique({
      where: { id, activo: true },
    });

    if (!adicional) return null;

    return {
      id: adicional.id,
      nombre: adicional.nombre,
      precio: adicional.precio,
      imagen: adicional.imagen,
    };
  }

  // ================= ESTADO PEDIDO =================
  async findAllEstadoPedido() {
    const estados = await this.prisma.estadoPedido.findMany();

    return estados.map((estado) => ({
      id: estado.id,
      nombre: estado.nombre,
    }));
  }

  async findOneEstadoPedido(id: number) {
    const estado = await this.prisma.estadoPedido.findUnique({
      where: { id },
    });

    if (!estado) return null;

    return {
      id: estado.id,
      nombre: estado.nombre,
    };
  }

  // ================= CATEGORIA =================
  async findAllCategoria() {
    const categorias = await this.prisma.categoria.findMany({
      where: { activo: true },
      include: {
        productos: {
          where: { activo: true },
          include: {
            tamano: true,
            opciones: {
              include: {
                opcion: true,
              },
            },
            ingredientes: {
              include: {
                ingrediente: true,
              },
            },
            tamanosDisponibles: {
              include: {
                tamano: true,
              },
            },
          },
        },
      },
    });

    return categorias.map((categoria) => ({
      id: categoria.id,
      nombre: categoria.nombre,
      imagen: categoria.imagen,
      productos: categoria.productos.map((producto) => ({
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        imagen: producto.imagen,
        precio: producto.precio,
        tamano: producto.tamano
          ? {
              id: producto.tamano.id,
              nombre: producto.tamano.nombre,
            }
          : null,
        opciones: producto.opciones.map((po) => ({
          id: po.opcion.id,
          nombre: po.opcion.nombre,
          precio: po.precio,
        })),
        ingredientes: producto.ingredientes.map((pi) => ({
          id: pi.ingrediente.id,
          nombre: pi.ingrediente.nombre,
          opcional: pi.opcional,
          porDefecto: pi.por_defecto,
        })),
        tamanos: producto.tamanosDisponibles.map((pt) => ({
          id: pt.tamano.id,
          nombre: pt.tamano.nombre,
          precio: pt.precio,
        })),
      })),
    }));
  }

  async findOneCategoria(id: number) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id, activo: true },
      include: {
        productos: {
          where: { activo: true },
          include: {
            tamano: true,
            opciones: {
              include: {
                opcion: true,
              },
            },
            ingredientes: {
              include: {
                ingrediente: true,
              },
            },
            tamanosDisponibles: {
              include: {
                tamano: true,
              },
            },
          },
        },
      },
    });

    if (!categoria) return null;

    return {
      id: categoria.id,
      nombre: categoria.nombre,
      imagen: categoria.imagen,
      productos: categoria.productos.map((producto) => ({
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        imagen: producto.imagen,
        precio: producto.precio,
        tamano: producto.tamano
          ? {
              id: producto.tamano.id,
              nombre: producto.tamano.nombre,
            }
          : null,
        opciones: producto.opciones.map((po) => ({
          id: po.opcion.id,
          nombre: po.opcion.nombre,
          precio: po.precio,
        })),
        ingredientes: producto.ingredientes.map((pi) => ({
          id: pi.ingrediente.id,
          nombre: pi.ingrediente.nombre,
          opcional: pi.opcional,
          porDefecto: pi.por_defecto,
        })),
        tamanos: producto.tamanosDisponibles.map((pt) => ({
          id: pt.tamano.id,
          nombre: pt.tamano.nombre,
          precio: pt.precio,
        })),
      })),
    };
  }

  // ================= INGREDIENTE =================
  async findAllIngrediente() {
    const ingredientes = await this.prisma.ingrediente.findMany();

    return ingredientes.map((ingrediente) => ({
      id: ingrediente.id,
      nombre: ingrediente.nombre,
    }));
  }

  async findOneIngrediente(id: number) {
    const ingrediente = await this.prisma.ingrediente.findUnique({
      where: { id },
    });

    if (!ingrediente) return null;

    return {
      id: ingrediente.id,
      nombre: ingrediente.nombre,
    };
  }

  // ================= TAMANO =================
  async findAllTamano() {
    const tamanos = await this.prisma.tamano.findMany();

    return tamanos.map((tamano) => ({
      id: tamano.id,
      nombre: tamano.nombre,
    }));
  }

  async findOneTamano(id: number) {
    const tamano = await this.prisma.tamano.findUnique({
      where: { id },
    });

    if (!tamano) return null;

    return {
      id: tamano.id,
      nombre: tamano.nombre,
    };
  }

  // ================= OPCIONES ================= (Reemplaza PORCION)
  async findAllOpciones() {
    const opciones = await this.prisma.opciones.findMany();

    return opciones.map((opcion) => ({
      id: opcion.id,
      nombre: opcion.nombre,
    }));
  }

  async findOneOpciones(id: number) {
    const opcion = await this.prisma.opciones.findUnique({
      where: { id },
    });

    if (!opcion) return null;

    return {
      id: opcion.id,
      nombre: opcion.nombre,
    };
  }

  // ================= PRODUCTO =================
  async findAllProducto() {
    const productos = await this.prisma.producto.findMany({
      where: { activo: true },
      include: {
        categoria: true,
        tamano: true,
        opciones: {
          include: {
            opcion: true,
          },
        },
        ingredientes: {
          include: {
            ingrediente: true,
          },
        },
      },
    });

    return productos.map((producto) => ({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      imagen: producto.imagen,
      precio: producto.precio,
      categoria: {
        id: producto.categoria.id,
        nombre: producto.categoria.nombre,
      },
      tamano: producto.tamano
        ? {
            id: producto.tamano.id,
            nombre: producto.tamano.nombre,
          }
        : null,
      opciones: producto.opciones.map((po) => ({
        id: po.opcion.id,
        nombre: po.opcion.nombre,
        precio: po.precio,
      })),
      ingredientes: producto.ingredientes.map((pi) => ({
        id: pi.ingrediente.id,
        nombre: pi.ingrediente.nombre,
        opcional: pi.opcional,
        porDefecto: pi.por_defecto,
      })),
    }));
  }

  async findOneProducto(id: number) {
    const producto = await this.prisma.producto.findUnique({
      where: { id, activo: true },
      include: {
        categoria: true,
        tamano: true,
        opciones: {
          include: {
            opcion: true,
          },
        },
        ingredientes: {
          include: {
            ingrediente: true,
          },
        },
      },
    });

    if (!producto) return null;

    return {
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      imagen: producto.imagen,
      precio: producto.precio,
      categoria: {
        id: producto.categoria.id,
        nombre: producto.categoria.nombre,
      },
      tamano: producto.tamano
        ? {
            id: producto.tamano.id,
            nombre: producto.tamano.nombre,
          }
        : null,
      opciones: producto.opciones.map((po) => ({
        id: po.opcion.id,
        nombre: po.opcion.nombre,
        precio: po.precio,
      })),
      ingredientes: producto.ingredientes.map((pi) => ({
        id: pi.ingrediente.id,
        nombre: pi.ingrediente.nombre,
        opcional: pi.opcional,
        porDefecto: pi.por_defecto,
      })),
    };
  }
}
