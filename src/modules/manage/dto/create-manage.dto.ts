import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateManageDto {
  @ApiProperty()
  @IsString()
  leaderId: string; // UserId

  @ApiProperty()
  @IsString()
  staffId: string; //UserId
}