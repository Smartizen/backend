import { IsUUID, IsNotEmpty, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBuyDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty()
  @IsDate()
  date: Date;
}
