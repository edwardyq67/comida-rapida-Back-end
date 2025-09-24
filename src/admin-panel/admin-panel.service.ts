// src/admin-panel/admin-panel.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  CreateAdicionalDto,
  CreateEstadoPedidoDto,
  CreateCategoriaDto,
  CreateIngredienteDto,
  CreateTamanoDto,
  CreatePorcionDto,
  CreateProductoDto,
} from './dto/create-admin-panel.dto';
import {
  UpdateAdicionalDto,
  UpdateEstadoPedidoDto,
  UpdateCategoriaDto,
  UpdateIngredienteDto,
  UpdateTamanoDto,
  UpdatePorcionDto,
  UpdateProductoDto,
} from './dto/update-admin-panel.dto';

@Injectable()
export class AdminPanelService {
  private prisma = new PrismaClient();

  // ================= ADICIONAL =================
  async createAdicional(dto: CreateAdicionalDto) {
    return this.prisma.adicional.create({ data: dto });
  }

  async updateAdicional(id: number, dto: UpdateAdicionalDto) {
    return this.prisma.adicional.update({ where: { id }, data: dto });
  }

  async removeAdicional(id: number) {
    return this.prisma.adicional.delete({ where: { id } });
  }

  // ================= ESTADO PEDIDO =================
  async createEstadoPedido(dto: CreateEstadoPedidoDto) {
    return this.prisma.estadoPedido.create({ data: dto });
  }

  async updateEstadoPedido(id: number, dto: UpdateEstadoPedidoDto) {
    return this.prisma.estadoPedido.update({ where: { id }, data: dto });
  }

  async removeEstadoPedido(id: number) {
    return this.prisma.estadoPedido.delete({ where: { id } });
  }

  // ================= CATEGORIA =================
  async createCategoria(dto: CreateCategoriaDto) {
    return this.prisma.categoria.create({ data: dto });
  }

  async updateCategoria(id: number, dto: UpdateCategoriaDto) {
    return this.prisma.categoria.update({ where: { id }, data: dto });
  }

  async removeCategoria(id: number) {
    return this.prisma.categoria.delete({ where: { id } });
  }

  // ================= INGREDIENTE =================
  async createIngrediente(dto: CreateIngredienteDto) {
    return this.prisma.ingrediente.create({ data: dto });
  }

  async updateIngrediente(id: number, dto: UpdateIngredienteDto) {
    return this.prisma.ingrediente.update({ where: { id }, data: dto });
  }

  async removeIngrediente(id: number) {
    return this.prisma.ingrediente.delete({ where: { id } });
  }

  // ================= TAMANO =================
  async createTamano(dto: CreateTamanoDto) {
    return this.prisma.tamano.create({ data: dto });
  }

  async updateTamano(id: number, dto: UpdateTamanoDto) {
    return this.prisma.tamano.update({ where: { id }, data: dto });
  }

  async removeTamano(id: number) {
    return this.prisma.tamano.delete({ where: { id } });
  }

  // ================= PORCION =================
  async createPorcion(dto: CreatePorcionDto) {
    return this.prisma.porcion.create({ data: dto });
  }

  async updatePorcion(id: number, dto: UpdatePorcionDto) {
    return this.prisma.porcion.update({ where: { id }, data: dto });
  }

  async removePorcion(id: number) {
    return this.prisma.porcion.delete({ where: { id } });
  }

  // ================= PRODUCTO =================
  async createProducto(dto: CreateProductoDto) {
    return this.prisma.producto.create({ data: dto });
  }

  async updateProducto(id: number, dto: UpdateProductoDto) {
    return this.prisma.producto.update({ where: { id }, data: dto });
  }

  async removeProducto(id: number) {
    return this.prisma.producto.delete({ where: { id } });
  }
}
