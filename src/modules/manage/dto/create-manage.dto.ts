import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateManageDto {
  @ApiProperty()
  @IsString()
  userId: string; // UserId

  @ApiProperty()
  @IsString()
  farmId: string; // FarmId
}
