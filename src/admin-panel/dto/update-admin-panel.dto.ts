// src/admin-panel/dto/update-admin-panel.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import {
  CreateAdicionalDto,
  CreateEstadoPedidoDto,
  CreateCategoriaDto,
  CreateIngredienteDto,
  CreateTamanoDto,
  CreatePorcionDto,
  CreateProductoDto,
} from './create-admin-panel.dto';

export class UpdateAdicionalDto extends PartialType(CreateAdicionalDto) {}
export class UpdateEstadoPedidoDto extends PartialType(CreateEstadoPedidoDto) {}
export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {}
export class UpdateIngredienteDto extends PartialType(CreateIngredienteDto) {}
export class UpdateTamanoDto extends PartialType(CreateTamanoDto) {}
export class UpdatePorcionDto extends PartialType(CreatePorcionDto) {}
export class UpdateProductoDto extends PartialType(CreateProductoDto) {}
