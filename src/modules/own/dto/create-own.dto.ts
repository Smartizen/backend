import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOwnDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  owner: string; //userID

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  farmId: string;
}
