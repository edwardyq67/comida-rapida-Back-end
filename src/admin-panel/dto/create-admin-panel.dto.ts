// src/admin-panel/dto/create-admin-panel.dto.ts
import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsBoolean,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

// ================= ADICIONAL =================
export class CreateAdicionalDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsNumber()
  precio: number;

  @IsOptional()
  @IsString()
  imagen?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

// ================= ESTADO PEDIDO =================
export class CreateEstadoPedidoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}

// ================= CATEGORIA =================
export class CreateCategoriaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  imagen?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

// ================= INGREDIENTE =================
export class CreateIngredienteDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}

// ================= TAMAÑO =================
export class CreateTamanoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}

// ================= OPCIONES =================
export class CreateOpcionesDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}

// ================= SUB-DTOs PARA PRODUCTO =================
export class ProductoIngredienteInput {
  @IsNotEmpty()
  @IsNumber()
  ingrediente_id: number;

  @IsOptional()
  @IsBoolean()
  opcional?: boolean;

  @IsOptional()
  @IsBoolean()
  por_defecto?: boolean;
}

export class ProductoOpcionInput {
  @IsNotEmpty()
  @IsNumber()
  opcion_id: number;

  // ELIMINAR precio ya que no lo necesitas
  // @IsOptional()
  // @IsNumber()
  // precio?: number;
}

export class ProductoTamanoInput {
  @IsNotEmpty()
  @IsNumber()
  tamano_id: number;

  @IsNotEmpty()
  @IsNumber()
  precio: number;
}

// ================= PRODUCTO =================
export class CreateProductoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  imagen?: string;

  @IsOptional()
  @IsNumber()
  precio?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsNotEmpty()
  @IsNumber()
  categoria_id: number;

  @IsOptional()
  @IsNumber()
  tamano_id?: number;

  // relaciones
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductoIngredienteInput)
  ingredientes?: ProductoIngredienteInput[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductoOpcionInput)
  opciones?: ProductoOpcionInput[]; // ← Ahora solo espera opcion_id

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductoTamanoInput)
  tamanosDisponibles?: ProductoTamanoInput[];
}
