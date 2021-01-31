import { Injectable, Inject } from '@nestjs/common';
import { CreateDeviceBelongDto } from './dto/create-device-belong.dto';
import { UpdateDeviceBelongDto } from './dto/update-device-belong.dto';
import { DeviceBelong } from './entities/device-belong.entity';

@Injectable()
export class DeviceBelongService {
  constructor(
    @Inject('DeviceBelongRepository')
    private readonly deviceBelongRepository: typeof DeviceBelong,
  ) {}

  create(createDeviceBelongDto: CreateDeviceBelongDto) {
    return 'This action adds a new deviceBelong';
  }

  findAll() {
    return `This action returns all deviceBelong`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deviceBelong`;
  }

  update(id: number, updateDeviceBelongDto: UpdateDeviceBelongDto) {
    return `This action updates a #${id} deviceBelong`;
  }

  remove(id: number) {
    return `This action removes a #${id} deviceBelong`;
  }
}
