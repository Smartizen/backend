import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsDefined,
  IsEnum,
} from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class SignUpDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;

  @ApiProperty()
  @IsEnum(Gender, {
    message: 'gender must be either male or female',
  })
  readonly gender: Gender;
}

export class SignInDto extends OmitType(SignUpDto, [
  'name',
  'gender',
] as const) {}
