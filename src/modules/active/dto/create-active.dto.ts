import { IsOptional, IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateActiveDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  roomId: string;

  @ApiProperty()
  @IsNotEmpty()
  deviceId: string;
}
