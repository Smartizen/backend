import { IsOptional, IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceBelongDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  cropId: string;

  @ApiProperty()
  @IsNotEmpty()
  deviceId: string;
}
