import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum Platform {
  ANDROID = 'android',
  IOS = 'ios',
}

export class SendTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty()
  @IsEnum(Platform, {
    message: 'platform must be either android or ios',
  })
  readonly platform: Platform;
}
