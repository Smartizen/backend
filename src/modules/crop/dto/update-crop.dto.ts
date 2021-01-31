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

import { PartialType } from '@nestjs/mapped-types';
import { CreateCropDto } from './create-crop.dto';

export class UpdateCropDto extends PartialType(CreateCropDto) {}
