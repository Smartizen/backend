import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserInfoDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  phonenumber: string;
}
