// src/admin-panel/admin-panel.controller.ts
import {
  Controller,
  Post,
  Body,
  Patch,
  UseGuards,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
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
import { Rol } from '@prisma/client';

@Controller('admin-panel')
export class AdminPanelController {
  constructor(private readonly adminPanelService: AdminPanelService) {}

  // ================= ADICIONAL =================

  @Roles(Rol.ADMIN)
  @Post('adicional')
  async createAdicional(@Body() dto: CreateAdicionalDto) {
    try {
      return await this.adminPanelService.createAdicional(dto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Roles(Rol.ADMIN)
  @Patch('adicional/:id')
  async updateAdicional(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAdicionalDto,
  ) {
    try {
      return await this.adminPanelService.updateAdicional(id, dto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ================= ESTADO PEDIDO =================

  @Roles(Rol.ADMIN)
  @Post('estado-pedido')
  async createEstadoPedido(@Body() dto: CreateEstadoPedidoDto) {
    try {
      return await this.adminPanelService.createEstadoPedido(dto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Roles(Rol.ADMIN)
  @Patch('estado-pedido/:id')
  async updateEstadoPedido(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEstadoPedidoDto,
  ) {
    try {
      return await this.adminPanelService.updateEstadoPedido(id, dto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ================= CATEGORIA =================

  @Roles(Rol.ADMIN)
  @Post('categoria')
  async createCategoria(@Body() dto: CreateCategoriaDto) {
    try {
      return await this.adminPanelService.createCategoria(dto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Roles(Rol.ADMIN)
  @Patch('categoria/:id')
  async updateCategoria(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoriaDto,
  ) {
    try {
      return await this.adminPanelService.updateCategoria(id, dto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ================= INGREDIENTE =================

  @Roles(Rol.ADMIN)
  @Post('ingrediente')
  async createIngrediente(@Body() dto: CreateIngredienteDto) {
    try {
      return await this.adminPanelService.createIngrediente(dto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Roles(Rol.ADMIN)
  @Patch('ingrediente/:id')
  async updateIngrediente(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateIngredienteDto,
  ) {
    try {
      return await this.adminPanelService.updateIngrediente(id, dto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ================= TAMANO =================

  @Roles(Rol.ADMIN)
  @Post('tamano')
  async createTamano(@Body() dto: CreateTamanoDto) {
    try {
      return await this.adminPanelService.createTamano(dto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Roles(Rol.ADMIN)
  @Patch('tamano/:id')
  async updateTamano(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTamanoDto,
  ) {
    try {
      return await this.adminPanelService.updateTamano(id, dto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ================= OPCIONES =================

  @Roles(Rol.ADMIN)
  @Post('opciones')
  async createOpciones(@Body() dto: CreateOpcionesDto) {
    try {
      return await this.adminPanelService.createOpciones(dto);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Internal server error';

      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Roles(Rol.ADMIN)
  @Patch('opciones/:id')
  async updateOpciones(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOpcionesDto,
  ) {
    try {
      return await this.adminPanelService.updateOpciones(id, dto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // ================= PRODUCTO =================

  @Roles(Rol.ADMIN)
  @Post('producto')
  async createProducto(@Body() dto: CreateProductoDto) {
    try {
      return await this.adminPanelService.createProducto(dto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Roles(Rol.ADMIN)
  @Patch('producto/:id')
  async updateProducto(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductoDto,
  ) {
    try {
      return await this.adminPanelService.updateProducto(id, dto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
