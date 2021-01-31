import { IsOptional, IsUUID, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceBelongDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  cropId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  deviceId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}