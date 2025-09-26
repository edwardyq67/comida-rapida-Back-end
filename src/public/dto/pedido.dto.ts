import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsDateString,
  Min,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO para PedidoIngrediente
export class PedidoIngredienteDto {
  @IsNumber()
  @IsPositive()
  ingrediente_id: number;

  @IsBoolean()
  @IsOptional()
  incluido?: boolean = true;
}

// DTO para PedidoAdicional
export class PedidoAdicionalDto {
  @IsNumber()
  @IsPositive()
  adicional_id: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  cantidad: number = 1;

  @IsNumber()
  @Min(0)
  precio_unitario: number;
}

// DTO para PedidoItem
export class CreatePedidoItemDto {
  @IsNumber()
  @IsPositive()
  producto_id: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  cantidad: number = 1;

  @IsNumber()
  @Min(0)
  precio_unitario: number;

  @IsNumber()
  @Min(0)
  subtotal: number;

  @IsString()
  @IsOptional()
  observaciones?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  productoTamano_id?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  opcionId?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PedidoIngredienteDto)
  @IsOptional()
  pedidoIngredientes?: PedidoIngredienteDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PedidoAdicionalDto)
  @IsOptional()
  pedidoAdicionales?: PedidoAdicionalDto[];
}

export class UpdatePedidoItemDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  producto_id?: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @IsOptional()
  cantidad?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  precio_unitario?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  subtotal?: number;

  @IsString()
  @IsOptional()
  observaciones?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  productoTamano_id?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  opcionId?: number;
}

// DTO para Pedido
export class CreatePedidoDto {
  @IsString()
  @IsOptional()
  cliente?: string;

  @IsString()
  @IsOptional()
  notas?: string;

  @IsNumber()
  @Min(0)
  total: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  estado_id?: number = 1; // Por defecto PENDIENTE

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePedidoItemDto)
  pedidoItems: CreatePedidoItemDto[];
}

export class UpdatePedidoDto {
  @IsString()
  @IsOptional()
  cliente?: string;

  @IsString()
  @IsOptional()
  notas?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  total?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  estado_id?: number;
}

export class UpdateEstadoPedidoDto {
  @IsNumber()
  @IsPositive()
  estado_id: number;
}

// DTOs para queries/filtros
export class PedidoQueryDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  estado?: number;

  @IsString()
  @IsOptional()
  cliente?: string;

  @IsDateString()
  @IsOptional()
  fecha?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  page?: number = 1;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit?: number = 10;
}

export class PedidoItemQueryDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  pedidoId?: number;
}
