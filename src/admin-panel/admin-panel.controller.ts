// src/admin-panel/admin-panel.controller.ts
import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminPanelService } from './admin-panel.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/guards/roles.guard';
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
import { Rol } from '@prisma/client';

@Controller('admin-panel')
export class AdminPanelController {
  constructor(private readonly adminPanelService: AdminPanelService) {}

  // ================= ADICIONAL =================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Post('adicional')
  createAdicional(@Body() dto: CreateAdicionalDto) {
    return this.adminPanelService.createAdicional(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Patch('adicional/:id')
  updateAdicional(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAdicionalDto,
  ) {
    return this.adminPanelService.updateAdicional(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Delete('adicional/:id')
  removeAdicional(@Param('id', ParseIntPipe) id: number) {
    return this.adminPanelService.removeAdicional(id);
  }

  // ================= ESTADO PEDIDO =================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Post('estado-pedido')
  createEstadoPedido(@Body() dto: CreateEstadoPedidoDto) {
    return this.adminPanelService.createEstadoPedido(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Patch('estado-pedido/:id')
  updateEstadoPedido(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEstadoPedidoDto,
  ) {
    return this.adminPanelService.updateEstadoPedido(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Delete('estado-pedido/:id')
  removeEstadoPedido(@Param('id', ParseIntPipe) id: number) {
    return this.adminPanelService.removeEstadoPedido(id);
  }

  // ================= CATEGORIA =================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Post('categoria')
  createCategoria(@Body() dto: CreateCategoriaDto) {
    return this.adminPanelService.createCategoria(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Patch('categoria/:id')
  updateCategoria(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoriaDto,
  ) {
    return this.adminPanelService.updateCategoria(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Delete('categoria/:id')
  removeCategoria(@Param('id', ParseIntPipe) id: number) {
    return this.adminPanelService.removeCategoria(id);
  }

  // ================= INGREDIENTE =================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Post('ingrediente')
  createIngrediente(@Body() dto: CreateIngredienteDto) {
    return this.adminPanelService.createIngrediente(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Patch('ingrediente/:id')
  updateIngrediente(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateIngredienteDto,
  ) {
    return this.adminPanelService.updateIngrediente(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Delete('ingrediente/:id')
  removeIngrediente(@Param('id', ParseIntPipe) id: number) {
    return this.adminPanelService.removeIngrediente(id);
  }

  // ================= TAMANO =================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Post('tamano')
  createTamano(@Body() dto: CreateTamanoDto) {
    return this.adminPanelService.createTamano(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Patch('tamano/:id')
  updateTamano(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTamanoDto,
  ) {
    return this.adminPanelService.updateTamano(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Delete('tamano/:id')
  removeTamano(@Param('id', ParseIntPipe) id: number) {
    return this.adminPanelService.removeTamano(id);
  }

  // ================= PORCION =================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Post('porcion')
  createPorcion(@Body() dto: CreatePorcionDto) {
    return this.adminPanelService.createPorcion(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Patch('porcion/:id')
  updatePorcion(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePorcionDto,
  ) {
    return this.adminPanelService.updatePorcion(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Delete('porcion/:id')
  removePorcion(@Param('id', ParseIntPipe) id: number) {
    return this.adminPanelService.removePorcion(id);
  }

  // ================= PRODUCTO =================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Post('producto')
  createProducto(@Body() dto: CreateProductoDto) {
    return this.adminPanelService.createProducto(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Patch('producto/:id')
  updateProducto(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductoDto,
  ) {
    return this.adminPanelService.updateProducto(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Delete('producto/:id')
  removeProducto(@Param('id', ParseIntPipe) id: number) {
    return this.adminPanelService.removeProducto(id);
  }
}
