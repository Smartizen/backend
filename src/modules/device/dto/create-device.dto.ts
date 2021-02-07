import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiProperty()
  @IsNotEmpty()
  typeId: string;

  @ApiProperty()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsInt()
  price: number;

  @ApiProperty()
  @IsInt()
  discount: number;
}
