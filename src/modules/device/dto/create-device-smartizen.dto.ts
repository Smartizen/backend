import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceSmartizenDto {
  @ApiProperty()
  @IsNotEmpty()
  typeId: string;

  @ApiProperty()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty()
  host: string;

  @ApiProperty()
  description: string;
}
