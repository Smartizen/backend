import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { UsersService } from '../users/users.service';
import { House } from '../house/entities/house.entity';
import { User } from '../users/user.entity';
import { Device } from '../device/entities/device.entity';
import { DeviceType } from '../device-type/entities/device-type.entity';
import { Function } from '../function/entities/function.entity';

@Injectable()
export class RoomService {
  constructor(
    @Inject('RoomRepository')
    private readonly roomRepository: typeof Room,

    private readonly userService: UsersService,
  ) {}

  async create(createRoomDto: CreateRoomDto, userId: string) {
    let { houseId } = createRoomDto;
    let userOwns = await this.userService.isOwnHouse(houseId, userId);
    if (!!userOwns) {
      let room = new Room(createRoomDto);
      let newRoom = await room.save();
      return newRoom;
    } else {
      return { status: 401, message: 'User not belong this house' };
    }
  }

  findAll() {
    return `This action returns all room`;
  }

  async findAllMyRoom(userId: string, houseId: string) {
    return await this.userService.myRoomByHouse(userId, houseId);
  }

  async findOne(roomId: string, userId: string) {
    try {
      // TODO check role in house
      if (await this.isUserOwnRoom(roomId, userId)) {
        let room = await this.roomRepository.findOne({
          where: { id: roomId },
          attributes: ['id', 'name', 'houseId'],
          include: [
            {
              model: Device,
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
              attributes: ['id', 'description', 'deviceId'],
            },
          ],
        });

        // convert
        let data = room.toJSON();

        let newDevice = await data['devices'].map(device => {
          device['activeId'] = device.Active.id;
          device['functions'] = device.deviceType.functions;
          delete device.deviceType;
          delete device.Active;
          return device;
        });

        data['devices'] = newDevice;

        return {
          data,
        };
      } else {
        throw new HttpException(
          {
            message: "you're not the owner of this house",
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          message: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(roomId: string, userId: string) {
    try {
      // TODO check role in houset
      if (this.isUserOwnRoom(roomId, userId)) {
        this.roomRepository.destroy({ where: { id: roomId } });
        return {
          message: 'delete successfully',
        };
      } else {
        throw new HttpException(
          {
            message: "you're not the owner of this house",
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          message: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async isUserOwnRoom(roomId: string, userId) {
    let isOwnRoom = await this.roomRepository.findOne({
      where: { id: roomId },
      attributes: [],
      include: [
        {
          model: House,
          include: [{ model: User, where: { id: userId } }],
        },
      ],
    });

    return !!isOwnRoom.house;
  }
}
