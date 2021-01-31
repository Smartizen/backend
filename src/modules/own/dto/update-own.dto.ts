import { PartialType } from '@nestjs/mapped-types';
import { CreateOwnDto } from './create-own.dto';

export class UpdateOwnDto extends PartialType(CreateOwnDto) {}
