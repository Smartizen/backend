import {
  Injectable,
  Inject,
  HttpService,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { ControlDeviceDto } from './dto/control-device.dto';
import { Device } from './entities/device.entity';
import { DeviceType } from '../device-type/entities/device-type.entity';
import { Function } from '../function/entities/function.entity';
import { UsersService } from '../users/users.service';
import { Room } from '../room/entities/room.entity';
import { House } from '../house/entities/house.entity';
import { User } from '../users/user.entity';
import { Messaging } from '../messaging/entities/messaging.entity';
import { Active } from '../active/entities/active.entity';

@Injectable()
export class DeviceService {
  constructor(
    private readonly userService: UsersService,

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

  async controlDevice(controlDeviceDto: ControlDeviceDto, userId: string) {
    // isUserOwnDevice
    let { deviceId, channel, command } = controlDeviceDto;
    command = JSON.parse(command);
    if (this.userService.isOwnDevice(deviceId, userId)) {
      let { deviceType } = await this.deviceRepository.findOne({
        where: { deviceId },
        include: [{ model: DeviceType }],
      });
      let data = {
        typeId: deviceType.typeId,
        deviceId: deviceId,
        channel: channel,
        command: command,
      };
      let res = await this.http
        .post(process.env.SENSOR_BACKEND_URL + '/device/commands', data)
        .toPromise();

      if (res.data.status === 200) {
        return { message: 'successfully' };
      } else {
        throw new HttpException(
          {
            message: 'Connect to device have problem !',
          },
          HttpStatus.BAD_GATEWAY,
        );
      }
    }
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

  async getOwnerOfDevice(deviceId: string) {
    let device = await this.deviceRepository.findOne({
      where: { deviceId },
      attributes: ['id'],
      include: [
        {
          model: Active,
          attributes: ['id'],
          include: [
            {
              model: Room,
              attributes: ['id'],
              include: [
                {
                  model: House,
                  attributes: ['id'],
                  include: [
                    {
                      model: User,
                      attributes: ['id'],
                      include: [{ model: Messaging, attributes: ['token'] }],
                      through: { attributes: [] },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    let convertJson = device.toJSON();
    let members = convertJson['active'][0]['room']['house']['members'];
    let data = members.map(member => {
      let notifications = member['notifications'].map(
        notification => notification.token,
      );
      return notifications;
    });

    var merged = [].concat.apply([], data);

    return merged;
  }
}
