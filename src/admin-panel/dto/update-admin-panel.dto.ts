// src/admin-panel/dto/update-admin-panel.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import {
  CreateAdicionalDto,
  CreateEstadoPedidoDto,
  CreateCategoriaDto,
  CreateIngredienteDto,
  CreateTamanoDto,
  CreateOpcionesDto,
  CreateProductoDto,
  ProductoIngredienteInput,
  ProductoOpcionInput,
  ProductoTamanoInput,
} from './create-admin-panel.dto';

export class UpdateAdicionalDto extends PartialType(CreateAdicionalDto) {}

export class UpdateEstadoPedidoDto extends PartialType(CreateEstadoPedidoDto) {}

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {}

export class UpdateIngredienteDto extends PartialType(CreateIngredienteDto) {}

export class UpdateTamanoDto extends PartialType(CreateTamanoDto) {}

export class UpdateOpcionesDto extends PartialType(CreateOpcionesDto) {}

// ================= PRODUCTO =================
export class UpdateProductoDto extends PartialType(CreateProductoDto) {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductoIngredienteInput)
  ingredientes?: ProductoIngredienteInput[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductoOpcionInput)
  opciones?: ProductoOpcionInput[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductoTamanoInput)
  tamanosDisponibles?: ProductoTamanoInput[];
}
