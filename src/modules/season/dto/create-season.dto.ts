import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSeasonDto {
  @ApiProperty()
  @IsString()
  cropId: string;

  @ApiProperty()
  @IsString()
  plant: string;

  @ApiProperty()
  @IsString()
  description: string;
}
