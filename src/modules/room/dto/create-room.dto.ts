import {
  IsNotEmpty,
  MinLength,
  IsString,
  MaxLength,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  houseId: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  name: string;

  @ApiProperty()
  @IsUrl()
  image: string;
}
