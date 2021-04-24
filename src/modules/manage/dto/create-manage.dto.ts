import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateManageDto {
  @ApiProperty()
  @IsEmail()
  email: string; // Email

  @ApiProperty()
  @IsString()
  houseId: string; // HouseId
}
