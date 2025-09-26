// src/admin-panel/admin-panel.service.ts
import { Injectable } from '@nestjs/common';
import { Opciones } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateAdicionalDto,
  CreateEstadoPedidoDto,
  CreateCategoriaDto,
  CreateIngredienteDto,
  CreateTamanoDto,
  CreateOpcionesDto,
  CreateProductoDto,
} from './dto/create-admin-panel.dto';
import {
  UpdateAdicionalDto,
  UpdateEstadoPedidoDto,
  UpdateCategoriaDto,
  UpdateIngredienteDto,
  UpdateTamanoDto,
  UpdateOpcionesDto,
  UpdateProductoDto,
} from './dto/update-admin-panel.dto';

@Injectable()
export class AdminPanelService {
  constructor(private prisma: PrismaService) {}

  // ================= ADICIONAL =================
  async createAdicional(dto: CreateAdicionalDto) {
    return this.prisma.adicional.create({
      data: dto,
    });
  }

  async updateAdicional(id: number, dto: UpdateAdicionalDto) {
    return this.prisma.adicional.update({
      where: { id },
      data: dto,
    });
  }

  // ================= ESTADO PEDIDO =================
  async createEstadoPedido(dto: CreateEstadoPedidoDto) {
    return this.prisma.estadoPedido.create({
      data: dto,
    });
  }

  async updateEstadoPedido(id: number, dto: UpdateEstadoPedidoDto) {
    return this.prisma.estadoPedido.update({
      where: { id },
      data: dto,
    });
  }

  // ================= CATEGORIA =================
  async createCategoria(dto: CreateCategoriaDto) {
    return this.prisma.categoria.create({
      data: dto,
    });
  }

  async updateCategoria(id: number, dto: UpdateCategoriaDto) {
    return this.prisma.categoria.update({
      where: { id },
      data: dto,
    });
  }

  // ================= INGREDIENTE =================
  async createIngrediente(dto: CreateIngredienteDto) {
    return this.prisma.ingrediente.create({
      data: dto,
    });
  }

  async updateIngrediente(id: number, dto: UpdateIngredienteDto) {
    return this.prisma.ingrediente.update({
      where: { id },
      data: dto,
    });
  }

  // ================= TAMANO =================
  async createTamano(dto: CreateTamanoDto) {
    return this.prisma.tamano.create({
      data: dto,
    });
  }

  async updateTamano(id: number, dto: UpdateTamanoDto) {
    return this.prisma.tamano.update({
      where: { id },
      data: dto,
    });
  }

  // ================= OPCIONES =================
  async createOpciones(dto: CreateOpcionesDto): Promise<Opciones> {
    return await this.prisma.opciones.create({ data: dto });
  }

  async updateOpciones(id: number, dto: UpdateOpcionesDto): Promise<Opciones> {
    return await this.prisma.opciones.update({ where: { id }, data: dto });
  }

  // ================= PRODUCTO =================
  async createProducto(dto: CreateProductoDto) {
    return this.prisma.producto.create({
      data: {
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        imagen: dto.imagen,
        precio: dto.precio,
        activo: dto.activo,
        categoria_id: dto.categoria_id,
        tamano_id: dto.tamano_id,
        ingredientes: {
          create: dto.ingredientes || [],
        },
        opciones: {
          create: (dto.opciones || []).map((opcion) => ({
            opcion_id: opcion.opcion_id,
            precio: null, // ← O elimina esta línea si no quieres el campo
          })),
        },
        tamanosDisponibles: {
          create: (dto.tamanosDisponibles || []).map((tamano) => ({
            tamano_id: tamano.tamano_id,
            precio: Number(tamano.precio), // ← Asegurar que sea número
          })),
        },
      },
      include: {
        ingredientes: {
          include: {
            ingrediente: true,
          },
        },
        opciones: {
          include: {
            opcion: true,
          },
        },
        tamanosDisponibles: {
          include: {
            tamano: true,
          },
        },
      },
    });
  }
  async updateProducto(id: number, dto: UpdateProductoDto) {
    return this.prisma.producto.update({
      where: { id },
      data: {
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        imagen: dto.imagen,
        precio: dto.precio,
        activo: dto.activo,
        categoria_id: dto.categoria_id,
        tamano_id: dto.tamano_id,
        // Actualizar ingredientes
        ingredientes: dto.ingredientes
          ? {
              deleteMany: {}, // Eliminar todos los ingredientes existentes
              create: dto.ingredientes.map((ing) => ({
                ingrediente_id: ing.ingrediente_id,
                opcional: ing.opcional,
                por_defecto: ing.por_defecto,
              })),
            }
          : undefined,

        // Actualizar opciones
        opciones: dto.opciones
          ? {
              deleteMany: {}, // Eliminar todas las opciones existentes
              create: dto.opciones.map((op) => ({
                opcion_id: op.opcion_id,
              })),
            }
          : undefined,

        // Actualizar tamaños disponibles
        tamanosDisponibles: dto.tamanosDisponibles
          ? {
              deleteMany: {}, // Eliminar todos los tamaños existentes
              create: dto.tamanosDisponibles.map((tam) => ({
                tamano_id: tam.tamano_id,
                precio: Number(tam.precio), // Asegurar que sea número
              })),
            }
          : undefined,
      },
      include: {
        categoria: true,
        tamano: true,
        ingredientes: {
          include: {
            ingrediente: true,
          },
        },
        opciones: {
          include: {
            opcion: true,
          },
        },
        tamanosDisponibles: {
          include: {
            tamano: true,
          },
        },
      },
    });
  }
}
