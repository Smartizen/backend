import {
  IsNotEmpty,
  MinLength,
  IsString,
  MaxLength,
  Allow,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommandDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  command: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
}
