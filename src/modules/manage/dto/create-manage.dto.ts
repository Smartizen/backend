import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateManageDto {
  @ApiProperty()
  @IsString()
  masterId: string; // UserId

  @ApiProperty()
  @IsString()
  staffId: string; //UserId
}
