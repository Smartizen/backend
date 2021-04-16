import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateActiveDto } from './dto/create-active.dto';
import { UpdateActiveDto } from './dto/update-active.dto';
import { Active } from './entities/active.entity';
import { CropService } from '../crop/crop.service';
import { Device } from '../device/entities/device.entity';

@Injectable()
export class ActiveService {
  constructor(
    private readonly cropService: CropService,

    @Inject('ActiveRepository')
    private readonly deviceBelongRepository: typeof Active,
  ) {}

  async create(createActiveDto: CreateActiveDto, userId: string) {
    let { cropId, deviceId } = createActiveDto;
    if (this.cropService.isUserOwnCrop(cropId, userId)) {
      try {
        let belong = new Active({ cropId, deviceId });
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
    return `This action returns a #${id} active`;
  }

  update(id: number, updateActiveDto: UpdateActiveDto) {
    return `This action updates a #${id} active`;
  }

  remove(id: number) {
    return `This action removes a #${id} active`;
  }
}
