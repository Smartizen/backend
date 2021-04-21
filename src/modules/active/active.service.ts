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
    private readonly activeRepository: typeof Active,
  ) {}

  async create(createActiveDto: CreateActiveDto, userId: string) {
    let { cropId, deviceId } = createActiveDto;
    if (this.cropService.isUserOwnCrop(cropId, userId)) {
      try {
        let active = new Active({ cropId, deviceId });
        let NewBelong = await active.save();
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
      let data = await this.activeRepository.findAll({
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

  async findOne(id: string) {
    let data = await this.activeRepository.findOne({ where: { id } });
    return { data };
  }

  update(id: number, updateActiveDto: UpdateActiveDto) {
    return `This action updates a #${id} active`;
  }

  async remove(id: string) {
    // TODO set role for owner of house
    try {
      let data = await this.activeRepository.destroy({ where: { id } });
      return { message: 'Device has been disabled' };
    } catch (error) {
      throw new HttpException(
        {
          message: 'This device not exits or banned',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
