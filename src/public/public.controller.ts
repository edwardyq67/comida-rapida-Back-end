// src/public-panel/public-panel.controller.ts
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { PublicPanelService } from './public.service';

@Controller('public-panel')
export class PublicPanelController {
  constructor(private readonly publicPanelService: PublicPanelService) {}

  // ================= ADICIONAL =================
  @Public()
  @Get('adicional')
  findAllAdicional() {
    return this.publicPanelService.findAllAdicional();
  }

  @Public()
  @Get('adicional/:id')
  findOneAdicional(@Param('id', ParseIntPipe) id: number) {
    return this.publicPanelService.findOneAdicional(id);
  }

  // ================= ESTADO PEDIDO =================
  @Public()
  @Get('estado-pedido')
  findAllEstadoPedido() {
    return this.publicPanelService.findAllEstadoPedido();
  }

  @Public()
  @Get('estado-pedido/:id')
  findOneEstadoPedido(@Param('id', ParseIntPipe) id: number) {
    return this.publicPanelService.findOneEstadoPedido(id);
  }

  // ================= CATEGORIA =================
  @Public()
  @Get('categoria')
  findAllCategoria() {
    return this.publicPanelService.findAllCategoria();
  }

  @Public()
  @Get('categoria/:id')
  findOneCategoria(@Param('id', ParseIntPipe) id: number) {
    return this.publicPanelService.findOneCategoria(id);
  }

  // ================= INGREDIENTE =================
  @Public()
  @Get('ingrediente')
  findAllIngrediente() {
    return this.publicPanelService.findAllIngrediente();
  }

  @Public()
  @Get('ingrediente/:id')
  findOneIngrediente(@Param('id', ParseIntPipe) id: number) {
    return this.publicPanelService.findOneIngrediente(id);
  }

  // ================= TAMANO =================
  @Public()
  @Get('tamano')
  findAllTamano() {
    return this.publicPanelService.findAllTamano();
  }

  @Public()
  @Get('tamano/:id')
  findOneTamano(@Param('id', ParseIntPipe) id: number) {
    return this.publicPanelService.findOneTamano(id);
  }

  // ================= PORCION =================
  @Public()
  @Get('opciones')
  findAllOpciones() {
    return this.publicPanelService.findAllOpciones();
  }

  @Public()
  @Get('opciones/:id')
  findOneOpcion(@Param('id', ParseIntPipe) id: number) {
    return this.publicPanelService.findOneOpcion(id);
  }

  // ================= PRODUCTO =================
  @Public()
  @Get('producto')
  findAllProducto() {
    return this.publicPanelService.findAllProducto();
  }

  @Public()
  @Get('producto/:id')
  findOneProducto(@Param('id', ParseIntPipe) id: number) {
    return this.publicPanelService.findOneProducto(id);
  }
}
