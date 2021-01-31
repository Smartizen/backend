import { IsNotEmpty, MinLength, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCropDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  farmId: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  name: string;
}
