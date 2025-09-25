// src/admin-panel/dto/create-admin-panel.dto.ts
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

export class CreateOpcionesDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsNumber()
  precio: number;
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
  opciones_id?: number;
}
