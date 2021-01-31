import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  desciption: string;

  @ApiProperty()
  @IsInt()
  prime: number;

  @ApiProperty()
  @IsInt()
  discount: number;
}
