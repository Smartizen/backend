import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHouseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  lat: string;

  @ApiProperty()
  @IsNotEmpty()
  long: string;
}
