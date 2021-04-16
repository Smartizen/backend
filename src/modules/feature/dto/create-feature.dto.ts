import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeatureDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  deviceTypeId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  function_id: string;
}
