import { PartialType } from '@nestjs/mapped-types';
import { CreateActiveDto } from './create-active.dto';

export class UpdateActiveDto extends PartialType(CreateActiveDto) {}
