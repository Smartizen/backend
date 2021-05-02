import { Injectable, Inject, HttpService } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';
import { DeviceType } from '../device-type/entities/device-type.entity';
import { Function } from '../function/entities/function.entity';

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

  async findOne(deviceId: string) {
    let device = await this.deviceRepository.findOne({
      where: { deviceId },
      attributes: ['id', 'deviceId', 'description'],
      include: [
        {
          model: DeviceType,
          include: [
            {
              model: Function,
              attributes: ['id', 'name', 'command', 'description'],
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    // convert
    let data = device.toJSON();

    data['functions'] = data['deviceType'].functions;
    delete data['deviceType'];

    return { data };
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
