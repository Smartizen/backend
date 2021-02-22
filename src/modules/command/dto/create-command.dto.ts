import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommandDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  deviceTypeId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  command: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
}
