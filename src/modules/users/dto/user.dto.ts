import {
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsDate,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BelongsToMany } from 'sequelize-typescript';
import { House } from 'src/modules/house/entities/house.entity';
import { Manage } from 'src/modules/manage/entities/manage.entity';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class UserDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  firstname: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  lastname: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @Exclude()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsEnum(Gender, {
    message: 'gender must be either male or female',
  })
  readonly gender: Gender;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPhoneNumber('VN')
  phonenumber: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  image: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  dateOfBirth: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  readonly role: number;

  @BelongsToMany(() => House, () => Manage)
  houses: House[];
}
