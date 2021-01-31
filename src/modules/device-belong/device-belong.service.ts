import { Injectable } from '@nestjs/common';
import { CreateDeviceBelongDto } from './dto/create-device-belong.dto';
import { UpdateDeviceBelongDto } from './dto/update-device-belong.dto';

@Injectable()
export class DeviceBelongService {
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
