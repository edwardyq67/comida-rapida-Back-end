import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Query,
  Body,
} from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { PublicPanelService } from './public.service';
import { Opciones } from '@prisma/client';

@Controller('public-panel')
export class PublicPanelController {
  constructor(private readonly publicPanelService: PublicPanelService) {}

  // ================= estados-pedido =================
  @Public()
  @Post('estados-pedido')
  createEstadoPedido(@Body() estadoData: { nombre: string }) {
    return this.publicPanelService.createEstadoPedido(estadoData);
  }

  // Obtener todos los estados de pedido (útil para combos/selects)
  @Public()
  @Get('estados-pedido')
  getEstadosPedido() {
    return this.publicPanelService.getEstadosPedido();
  }
  // ================= PEDIDO =================
  @Public()
  @Get('pedido')
  findAllPedido(
    @Query('estado') estado?: string,
    @Query('cliente') cliente?: string,
    @Query('fecha') fecha?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.publicPanelService.findAllPedido({
      estado: estado ? parseInt(estado) : undefined,
      cliente,
      fecha,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 10,
    });
  }

  @Public()
  @Get('pedido/:id')
  findOnePedido(@Param('id', ParseIntPipe) id: number) {
    return this.publicPanelService.findOnePedido(id);
  }

  @Public()
  @Post('pedido')
  createPedido(@Body() pedidoData: any) {
    return this.publicPanelService.createPedido(pedidoData);
  }

  @Public()
  @Put('pedido/:id')
  updatePedido(@Param('id', ParseIntPipe) id: number, @Body() pedidoData: any) {
    return this.publicPanelService.updatePedido(id, pedidoData);
  }

  @Public()
  @Put('pedido/:id/estado')
  updateEstadoPedido(
    @Param('id', ParseIntPipe) id: number,
    @Body('estado_id', ParseIntPipe) estadoId: number,
  ) {
    return this.publicPanelService.updateEstadoPedido(id, estadoId);
  }

  @Public()
  @Delete('pedido/:id')
  removePedido(@Param('id', ParseIntPipe) id: number) {
    return this.publicPanelService.removePedido(id);
  }

  // ================= PEDIDO ITEM =================
  @Public()
  @Get('pedido-item')
  findAllPedidoItem(@Query('pedidoId') pedidoId?: string) {
    return this.publicPanelService.findAllPedidoItem({
      pedidoId: pedidoId ? parseInt(pedidoId) : undefined,
    });
  }

  @Public()
  @Get('pedido-item/:id')
  findOnePedidoItem(@Param('id', ParseIntPipe) id: number) {
    return this.publicPanelService.findOnePedidoItem(id);
  }

  @Public()
  @Post('pedido-item')
  createPedidoItem(@Body() pedidoItemData: any) {
    return this.publicPanelService.createPedidoItem(pedidoItemData);
  }

  @Public()
  @Put('pedido-item/:id')
  updatePedidoItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() pedidoItemData: any,
  ) {
    return this.publicPanelService.updatePedidoItem(id, pedidoItemData);
  }

  @Public()
  @Delete('pedido-item/:id')
  removePedidoItem(@Param('id', ParseIntPipe) id: number) {
    return this.publicPanelService.removePedidoItem(id);
  }

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

  // ================= OPCIONES =================
  @Public()
  @Get('opciones')
  findAllOpciones(): Promise<Opciones[]> {
    return this.publicPanelService.findAllOpciones();
  }

  @Public()
  @Get('opciones/:id')
  findOneOpciones(@Param('id', ParseIntPipe) id: number): Promise<Opciones> {
    return this.publicPanelService.findOneOpciones(id);
  }

  // ================= PRODUCTO =================
  @Public()
  @Get('producto')
  findAllProducto(
    @Query('category') category?: string,
    @Query('nombre') nombre?: string,
  ) {
    return this.publicPanelService.findAllProducto({
      category,
      nombre,
    });
  }

  @Public()
  @Get('producto/:id')
  findOneProducto(@Param('id', ParseIntPipe) id: number) {
    return this.publicPanelService.findOneProducto(id);
  }
}
