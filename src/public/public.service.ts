// src/public-panel/public-panel.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PublicPanelService {
  private prisma = new PrismaClient();

  // ================= ADICIONAL =================
  async findAllAdicional() {
    return this.prisma.adicional.findMany();
  }

  async findOneAdicional(id: number) {
    const adicional = await this.prisma.adicional.findUnique({ where: { id } });
    if (!adicional) throw new NotFoundException('Adicional no encontrado');
    return adicional;
  }

  // ================= ESTADO PEDIDO =================
  async findAllEstadoPedido() {
    return this.prisma.estadoPedido.findMany();
  }

  async findOneEstadoPedido(id: number) {
    const estado = await this.prisma.estadoPedido.findUnique({ where: { id } });
    if (!estado) throw new NotFoundException('Estado no encontrado');
    return estado;
  }

  // ================= CATEGORIA =================
  async findAllCategoria() {
    return this.prisma.categoria.findMany();
  }

  async findOneCategoria(id: number) {
    const categoria = await this.prisma.categoria.findUnique({ where: { id } });
    if (!categoria) throw new NotFoundException('Categoría no encontrada');
    return categoria;
  }

  // ================= INGREDIENTE =================
  async findAllIngrediente() {
    return this.prisma.ingrediente.findMany();
  }

  async findOneIngrediente(id: number) {
    const ingrediente = await this.prisma.ingrediente.findUnique({
      where: { id },
    });
    if (!ingrediente) throw new NotFoundException('Ingrediente no encontrado');
    return ingrediente;
  }

  // ================= TAMANO =================
  async findAllTamano() {
    return this.prisma.tamano.findMany();
  }

  async findOneTamano(id: number) {
    const tamano = await this.prisma.tamano.findUnique({ where: { id } });
    if (!tamano) throw new NotFoundException('Tamaño no encontrado');
    return tamano;
  }

  // ================= PORCION =================
  async findAllPorcion() {
    return this.prisma.porcion.findMany();
  }

  async findOnePorcion(id: number) {
    const porcion = await this.prisma.porcion.findUnique({ where: { id } });
    if (!porcion) throw new NotFoundException('Porción no encontrada');
    return porcion;
  }

  // ================= PRODUCTO =================
  async findAllProducto() {
    return this.prisma.producto.findMany();
  }

  async findOneProducto(id: number) {
    const producto = await this.prisma.producto.findUnique({ where: { id } });
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
  }
}
