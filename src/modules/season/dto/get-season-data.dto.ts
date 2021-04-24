import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetSeasonDataDto {
  @ApiProperty()
  @IsString()
  roomId: string;

  @ApiProperty()
  @IsString()
  seasonId: string;
}
