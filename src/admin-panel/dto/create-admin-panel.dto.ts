// src/admin-panel/dto/create-adicional.dto.ts
import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

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
}

export class CreateEstadoPedidoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}

export class CreateCategoriaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  imagen?: string;
}

export class CreateIngredienteDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}

export class CreateTamanoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}

export class CreatePorcionDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}

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

  @IsNotEmpty()
  @IsNumber()
  precio: number;

  @IsNotEmpty()
  @IsNumber()
  categoria_id: number;

  @IsOptional()
  @IsNumber()
  tamano_id?: number;

  @IsOptional()
  @IsNumber()
  porcion_id?: number;
}
