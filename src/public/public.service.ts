import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Adicional,
  EstadoPedido,
  Categoria,
  Ingrediente,
  Tamano,
  Opciones,
  Prisma,
} from '@prisma/client';

type ProductoWithRelations = Prisma.ProductoGetPayload<{
  select: {
    id: true;
    nombre: true;
    descripcion: true;
    imagen: true;
    precio: true;
    activo: true;
    categoria: { select: { id: true; nombre: true } };
    tamano: { select: { id: true; nombre: true } };
    ingredientes: {
      select: {
        id: true;
        opcional: true;
        por_defecto: true;
        ingrediente: { select: { id: true; nombre: true } };
      };
    };
    opciones: {
      select: {
        id: true;
        precio: false;
        opcion: { select: { id: true; nombre: true } };
      };
    };
  };
}>;

@Injectable()
export class PublicPanelService {
  constructor(private readonly prisma: PrismaService) {}
  // ================= estados-pedido =================
  async createEstadoPedido(estadoData: { nombre: string }) {
    try {
      return await this.prisma.estadoPedido.create({
        data: {
          nombre: estadoData.nombre,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        // Violación de unique constraint
        throw new error('El nombre del estado ya existe');
      }
      throw error;
    }
  }

  async getEstadosPedido() {
    return await this.prisma.estadoPedido.findMany({
      orderBy: { id: 'asc' },
    });
  }
  // ================= PEDIDO =================
  async findAllPedido(params: {
    estado?: number;
    cliente?: string;
    fecha?: string;
    page?: number;
    limit?: number;
  }) {
    const { estado, cliente, fecha, page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (estado) where.estado_id = estado;
    if (cliente) where.cliente = { contains: cliente, mode: 'insensitive' };
    if (fecha) {
      const startDate = new Date(fecha);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      where.fecha = { gte: startDate, lt: endDate };
    }

    const [pedidos, total] = await Promise.all([
      this.prisma.pedido.findMany({
        where,
        skip,
        take: limit,
        include: {
          estado: true,
          pedidoItems: {
            include: {
              producto: true,
              Tamano: true,
              Opcion: true,
              pedidoAdicionales: {
                include: {
                  adicional: true,
                },
              },
              pedidoIngredientes: {
                include: {
                  ingrediente: true,
                },
              },
            },
          },
        },
        orderBy: { id: 'asc' }, // ← CAMBIO AQUÍ
      }),
      this.prisma.pedido.count({ where }),
    ]);

    return {
      data: pedidos,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOnePedido(id: number) {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
      include: {
        estado: true,
        pedidoItems: {
          include: {
            producto: true,
            Tamano: true,
            Opcion: true,
            productoTamano: true,
            pedidoAdicionales: {
              include: {
                adicional: true,
              },
            },
            pedidoIngredientes: {
              // ← AGREGAR esto
              include: { ingrediente: true },
            },
          },
        },
      },
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }

    return pedido;
  }

  async createPedido(pedidoData: any) {
    try {
      console.log('Datos recibidos:', JSON.stringify(pedidoData, null, 2));

      // Validar datos básicos
      if (!pedidoData.cliente || !pedidoData.total) {
        throw new Error('Datos incompletos');
      }

      const result = await this.prisma.pedido.create({
        data: {
          cliente: pedidoData.cliente,
          notas: pedidoData.notas,
          total: pedidoData.total,
          estado_id: pedidoData.estado_id || 1,
          pedidoItems: {
            create:
              pedidoData.pedidoItems.create?.map((item: any) => ({
                producto_id: item.producto_id,
                cantidad: item.cantidad,
                precio_unitario: item.precio_unitario,
                subtotal: item.subtotal,
                productoTamano_id: item.productoTamano_id,
                opcionId: item.opcionId,
                pedidoIngredientes: {
                  create: item.pedidoIngredientes?.create || [],
                },
              })) || [],
          },
        },
        include: {
          estado: true,
          pedidoItems: {
            include: {
              producto: true,
              pedidoIngredientes: {
                include: { ingrediente: true },
              },
            },
          },
        },
      });

      console.log('Pedido creado exitosamente:', result);
      return result;
    } catch (error) {
      console.error('Error detallado al crear pedido:', error);
      // Log más específico para Prisma
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error('Código de error Prisma:', error.code);
        console.error('Meta del error:', error.meta);
      }
      throw new Error('Error al crear el pedido: ' + error.message);
    }
  }

  async updatePedido(id: number, pedidoData: any) {
    // Verificar si el pedido existe
    await this.findOnePedido(id);

    return await this.prisma.pedido.update({
      where: { id },
      data: {
        // Solo actualizar el estado_id
        estado_id: pedidoData.estado_id,
      },
      include: {
        estado: true,
        pedidoItems: {
          include: {
            producto: true,
            Tamano: true,
            Opcion: true,
            pedidoAdicionales: {
              include: {
                adicional: true,
              },
            },
            pedidoIngredientes: {
              include: {
                ingrediente: true,
              },
            },
          },
        },
      },
    });
  }

  async updateEstadoPedido(id: number, estadoId: number) {
    // Verificar si el pedido existe
    await this.findOnePedido(id);

    return await this.prisma.pedido.update({
      where: { id },
      data: { estado_id: estadoId },
      include: {
        estado: true,
      },
    });
  }

  async removePedido(id: number) {
    // Verificar si el pedido existe
    await this.findOnePedido(id);

    // Eliminar en cascada (depende de tu configuración de BD)
    await this.prisma.pedidoItem.deleteMany({
      where: { pedido_id: id },
    });

    return await this.prisma.pedido.delete({
      where: { id },
    });
  }

  // ================= PEDIDO ITEM =================
  async findAllPedidoItem(params: { pedidoId?: number }) {
    const where: any = {};
    if (params.pedidoId) where.pedido_id = params.pedidoId;

    return await this.prisma.pedidoItem.findMany({
      where,
      include: {
        producto: true,
        Tamano: true,
        Opcion: true,
        pedidoAdicionales: true,
      },
    });
  }

  async findOnePedidoItem(id: number) {
    const pedidoItem = await this.prisma.pedidoItem.findUnique({
      where: { id },
      include: {
        producto: true,
        Tamano: true,
        Opcion: true,
        pedidoAdicionales: {
          include: {
            adicional: true,
          },
        },
      },
    });

    if (!pedidoItem) {
      throw new NotFoundException(`PedidoItem con ID ${id} no encontrado`);
    }

    return pedidoItem;
  }

  async createPedidoItem(pedidoItemData: any) {
    return await this.prisma.pedidoItem.create({
      data: {
        pedido_id: pedidoItemData.pedido_id,
        producto_id: pedidoItemData.producto_id,
        cantidad: pedidoItemData.cantidad,
        precio_unitario: pedidoItemData.precio_unitario,
        subtotal: pedidoItemData.subtotal,
        observaciones: pedidoItemData.observaciones,
        productoTamano_id: pedidoItemData.productoTamano_id,
        opcionId: pedidoItemData.opcionId,

        pedidoAdicionales: {
          create: pedidoItemData.pedidoAdicionales || [],
        },
      },
      include: {
        producto: true,

        pedidoAdicionales: true,
      },
    });
  }

  async updatePedidoItem(id: number, pedidoItemData: any) {
    await this.findOnePedidoItem(id);

    return await this.prisma.pedidoItem.update({
      where: { id },
      data: pedidoItemData,
      include: {
        producto: true,

        pedidoAdicionales: true,
      },
    });
  }

  async removePedidoItem(id: number) {
    await this.findOnePedidoItem(id);

    await this.prisma.pedidoAdicional.deleteMany({
      where: { pedidoItem_id: id },
    });

    return await this.prisma.pedidoItem.delete({
      where: { id },
    });
  }

  // ================= ADICIONAL =================
  async findAllAdicional(): Promise<Adicional[]> {
    const result = await this.prisma.adicional.findMany();
    return result;
  }

  async findOneAdicional(id: number): Promise<Adicional> {
    const adicional = await this.prisma.adicional.findUnique({ where: { id } });
    if (!adicional) {
      throw new NotFoundException(`Adicional ${id} no encontrado`);
    }
    return adicional;
  }

  // ================= ESTADO PEDIDO =================
  async findAllEstadoPedido(): Promise<EstadoPedido[]> {
    const result = await this.prisma.estadoPedido.findMany();
    return result;
  }

  async findOneEstadoPedido(id: number): Promise<EstadoPedido> {
    const estado = await this.prisma.estadoPedido.findUnique({ where: { id } });
    if (!estado) {
      throw new NotFoundException(`EstadoPedido ${id} no encontrado`);
    }
    return estado;
  }

  // ================= CATEGORIA =================
  async findAllCategoria(): Promise<Categoria[]> {
    const result = await this.prisma.categoria.findMany();
    return result;
  }

  async findOneCategoria(id: number): Promise<Categoria> {
    const categoria = await this.prisma.categoria.findUnique({ where: { id } });
    if (!categoria) {
      throw new NotFoundException(`Categoria ${id} no encontrada`);
    }
    return categoria;
  }

  // ================= INGREDIENTE =================
  async findAllIngrediente(): Promise<Ingrediente[]> {
    const result = await this.prisma.ingrediente.findMany();
    return result;
  }

  async findOneIngrediente(id: number): Promise<Ingrediente> {
    const ingrediente = await this.prisma.ingrediente.findUnique({
      where: { id },
    });
    if (!ingrediente) {
      throw new NotFoundException(`Ingrediente ${id} no encontrado`);
    }
    return ingrediente;
  }

  // ================= TAMAÑO =================
  async findAllTamano(): Promise<Tamano[]> {
    const result = await this.prisma.tamano.findMany();
    return result;
  }

  async findOneTamano(id: number): Promise<Tamano> {
    const tamano = await this.prisma.tamano.findUnique({ where: { id } });
    if (!tamano) throw new NotFoundException(`Tamaño ${id} no encontrado`);
    return tamano;
  }

  // ================= OPCIONES =================
  async findAllOpciones(): Promise<Opciones[]> {
    const result = await this.prisma.opciones.findMany();
    return result as Opciones[];
  }

  async findOneOpciones(id: number): Promise<Opciones> {
    const opcion = await this.prisma.opciones.findUnique({ where: { id } });
    if (!opcion) throw new NotFoundException(`Opción ${id} no encontrada`);
    return opcion;
  }

  // ================= PRODUCTO =================
  async findAllProducto(filters?: { category?: string; nombre?: string }) {
    const where: any = { activo: true };

    // Filtro por categoría
    if (filters?.category) {
      const categoryFilter = filters.category;

      if (!isNaN(Number(categoryFilter))) {
        where.categoria_id = Number(categoryFilter);
      } else {
        where.categoria = {
          nombre: {
            contains: categoryFilter,
            mode: 'insensitive',
          },
        };
      }
    }

    // Filtro por nombre
    if (filters?.nombre) {
      where.nombre = {
        contains: filters.nombre,
        mode: 'insensitive',
      };
    }

    return this.prisma.producto.findMany({
      where,
      include: {
        categoria: true,
        tamano: true,
        ingredientes: {
          include: {
            ingrediente: true,
          },
        },
        opciones: {
          // ← Agregar esto
          include: {
            opcion: true, // o el nombre de la relación según tu schema
          },
        },
        tamanosDisponibles: {
          // ← Y esto también si lo necesitas
          include: {
            tamano: true,
          },
        },
      },
      orderBy: { nombre: 'asc' },
    });
  }

  async findOneProducto(id: number): Promise<ProductoWithRelations> {
    const producto = await this.prisma.producto.findUnique({
      where: { id },
      select: {
        id: true,
        nombre: true,
        descripcion: true,
        imagen: true,
        precio: true,
        activo: true,
        categoria: { select: { id: true, nombre: true, imagen: true } },
        tamano: { select: { id: true, nombre: true } },
        ingredientes: {
          select: {
            id: true,
            opcional: true,
            por_defecto: true,
            ingrediente: { select: { id: true, nombre: true } },
          },
        },
        opciones: {
          select: {
            id: true,
            opcion: { select: { id: true, nombre: true } },
          },
        },
        // AGREGAR tamanosDisponibles
        tamanosDisponibles: {
          select: {
            id: true,
            precio: true,
            tamano: { select: { id: true, nombre: true } },
          },
        },
      },
    });

    if (!producto) throw new NotFoundException(`Producto ${id} no encontrado`);
    return producto;
  }
}
