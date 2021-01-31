import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceBelongDto } from './create-device-belong.dto';

export class UpdateDeviceBelongDto extends PartialType(CreateDeviceBelongDto) {}
