import { Injectable, Inject, HttpService } from '@nestjs/common';
import { CreateDeviceTypeDto } from './dto/create-device-type.dto';
import { UpdateDeviceTypeDto } from './dto/update-device-type.dto';
import { DeviceType } from './entities/device-type.entity';
import { Device } from '../device/entities/device.entity';
import { Command } from '../command/entities/command.entity';

@Injectable()
export class DeviceTypeService {
  constructor(
    @Inject('DeviceTypeRepository')
    private readonly deviceTypeRepository: typeof DeviceType,
    private http: HttpService,
  ) {}

  async create(createDeviceTypeDto: CreateDeviceTypeDto) {
    let res = await this.http
      .post(
        process.env.SENSOR_BACKEND_URL + '/admin/registerDeviceType',
        createDeviceTypeDto,
      )
      .toPromise();

    if (res.data.status === 200) {
      const deviceType = new DeviceType({
        typeId: res.data.typeId,
        description: createDeviceTypeDto.description,
      });
      deviceType.save();
    }
    return res.data;
  }

  async getAllDevice(typeId: string) {
    const device = await this.deviceTypeRepository.findAll({
      attributes: ['typeId'],
      where: { typeId },
      include: [Device],
    });
    return device;
  }

  async getAllCommand(typeId: string) {
    const device = await this.deviceTypeRepository.findAll({
      attributes: ['typeId'],
      where: { typeId },

      include: [
        { model: Command, attributes: ['id', 'command', 'description'] },
      ],
    });
    return device;
  }

  async findAll() {
    return this.deviceTypeRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} deviceType`;
  }

  update(id: number, updateDeviceTypeDto: UpdateDeviceTypeDto) {
    return `This action updates a #${id} deviceType`;
  }

  remove(id: number) {
    return `This action removes a #${id} deviceType`;
  }
}
