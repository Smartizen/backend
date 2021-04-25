import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { UsersService } from '../users/users.service';
import { House } from '../house/entities/house.entity';
import { User } from '../users/user.entity';

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

  findOne(id: number) {
    return `This action returns a #${id} room`;
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
