import { Injectable, Inject, HttpService } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';

@Injectable()
export class DeviceService {
  constructor(
    @Inject('DeviceRepository')
    private readonly deviceRepository: typeof Device,
    private http: HttpService,
  ) {}

  async create(createDeviceDto: CreateDeviceDto) {
    let res = await this.http
      .post(
        process.env.SENSOR_BACKEND_URL + '/admin/registerDevice',
        createDeviceDto,
      )
      .toPromise();

    let { typeId, deviceId, authToken } = res.data;
    if (res.data.status === 200) {
      const deviceType = new Device({
        typeId,
        deviceId,
        authToken,
        description: createDeviceDto.description,
      });
      deviceType.save();
    }

    return res.data;
  }

  findAll() {
    return this.deviceRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} device`;
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device`;
  }

  async remove(typeId: string, deviceId: string) {
    try {
      let res = await this.http
        .post(process.env.SENSOR_BACKEND_URL + '/admin/unRegisterDevice', {
          typeId,
          deviceId,
        })
        .toPromise();

      this.deviceRepository.destroy({ where: { deviceId } });
      return res.data;
    } catch (error) {
      return error;
    }
  }
}
