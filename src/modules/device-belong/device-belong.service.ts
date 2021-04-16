import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateDeviceBelongDto } from './dto/create-device-belong.dto';
import { UpdateDeviceBelongDto } from './dto/update-device-belong.dto';
import { DeviceBelong } from './entities/device-belong.entity';
import { CropService } from '../crop/crop.service';
import { Device } from '../device/entities/device.entity';

@Injectable()
export class DeviceBelongService {
  constructor(
    private readonly cropService: CropService,

    @Inject('DeviceBelongRepository')
    private readonly deviceBelongRepository: typeof DeviceBelong,
  ) {}

  async create(createDeviceBelongDto: CreateDeviceBelongDto, userId: string) {
    let { cropId, deviceId } = createDeviceBelongDto;
    if (this.cropService.isUserOwnCrop(cropId, userId)) {
      try {
        let belong = new DeviceBelong({ cropId, deviceId });
        let NewBelong = await belong.save();
        return { status: 200, data: NewBelong };
      } catch (error) {
        if (error.original.code === '23503') {
          throw new HttpException(
            {
              message: 'This device not exits or banned',
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    } else {
      return { status: 401, message: "You don't have right to add device" };
    }
  }

  async findAllDeviceInCrop(cropId: string, userId: string) {
    if (this.cropService.isUserOwnCrop(cropId, userId)) {
      let data = await this.deviceBelongRepository.findAll({
        where: { cropId },
        attributes: [],
        include: [
          {
            model: Device,
            attributes: ['typeId', 'deviceId'],
          },
        ],
      });
      return { status: 200, data };
    } else {
      return { status: 401, message: "You don't have right to add device" };
    }
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
