import { PartialType } from '@nestjs/mapped-types';
import { CreateFunctionDto } from './create-function.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateFunctionDto extends PartialType(CreateFunctionDto) {
  @ApiProperty()
  @IsString()
  @IsOptional()
  command: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
}
