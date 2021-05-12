import { Injectable, Inject, HttpService } from '@nestjs/common';
import { CreateDeviceTypeDto } from './dto/create-device-type.dto';
import { UpdateDeviceTypeDto } from './dto/update-device-type.dto';
import { DeviceType } from './entities/device-type.entity';
import { Device } from '../device/entities/device.entity';
import { Function } from '../function/entities/function.entity';

@Injectable()
export class DeviceTypeService {
  constructor(
    @Inject('DeviceTypeRepository')
    private readonly deviceTypeRepository: typeof DeviceType,
    private http: HttpService,
  ) {}

  // create deviceType for IBM Watson
  async createIoTWatson(createDeviceTypeDto: CreateDeviceTypeDto) {
    let res = await this.http
      .post(
        process.env.SENSOR_BACKEND_URL + '/admin/registerDeviceType/watson',
        createDeviceTypeDto,
      )
      .toPromise();

    if (res.data.status === 200) {
      const deviceType = new DeviceType({
        typeId: res.data.typeId,
        description: createDeviceTypeDto.description,
        platform: 'watson',
      });
      deviceType.save();
    }
    return res.data;
  }

  // create deviceType for Smartizen
  async createSmatizen(createDeviceTypeDto: CreateDeviceTypeDto) {
    let res = await this.http
      .post(
        process.env.SENSOR_BACKEND_URL + '/admin/registerDeviceType/smartizen',
        createDeviceTypeDto,
      )
      .toPromise();

    if (res.status === 200) {
      const deviceType = new DeviceType({
        typeId: res.data.typeId,
        description: createDeviceTypeDto.description,
        platform: 'smartizen',
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

  async getAllFeature(typeId: string) {
    const device = await this.deviceTypeRepository.findOne({
      attributes: ['typeId'],
      where: { typeId },

      include: [
        {
          model: Function,
          attributes: ['id', 'name', 'command', 'description'],
          // through: { attributes: [] },
        },
      ],
    });
    return device;
  }

  async findAll(platform: string) {
    return this.deviceTypeRepository.findAll({ where: { platform } });
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
