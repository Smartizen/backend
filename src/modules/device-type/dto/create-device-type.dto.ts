import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  typeId: string;

  @ApiProperty()
  description: string;
}
