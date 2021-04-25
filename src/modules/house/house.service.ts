import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { UsersService } from '../users/users.service';
import { House } from './entities/house.entity';
import { Manage } from '../manage/entities/manage.entity';
import { Active } from '../active/entities/active.entity';
import { Room } from '../room/entities/room.entity';
import { User } from '../users/user.entity';

@Injectable()
export class HouseService {
  constructor(
    private readonly userService: UsersService,

    @Inject('HouseRepository')
    private readonly houseRepository: typeof House,
  ) {}

  async create(createHouseDto: CreateHouseDto, userId: string) {
    try {
      let house = new House(createHouseDto);
      house = await house.save();
      const mange = new Manage({
        userId,
        houseId: house.id,
        role: 0,
      });
      await mange.save();
      return {
        status: 200,
        data: {
          id: house.id,
          name: house.name,
          image: house.image,
          lat: house.lat,
          long: house.long,
        },
        message: 'Create Successfully',
      };
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return `This action returns all house`;
  }

  async findAllMyHouse(userId: string) {
    return await this.userService.myHouse(userId);
  }

  async findOne(id: string) {
    const house = await this.houseRepository.findOne({
      attributes: ['id', 'name', 'image', 'lat', 'long'],
      where: { id },
      include: [
        {
          model: User,
          attributes: ['firstname', 'lastname'],
          through: { attributes: ['role'] },
        },
        {
          model: Room,
          attributes: ['id', 'name'],
          include: [
            {
              model: Active,
              attributes: ['deviceId'],
            },
          ],
        },
      ],
    });
    return { house };
  }

  update(id: number, updateHouseDto: UpdateHouseDto) {
    return `This action updates a #${id} house`;
  }

  async remove(houseId: string, userId: any) {
    try {
      // TODO check role in houset
      if (this.userService.isOwnHouse(houseId, userId)) {
        this.houseRepository.destroy({ where: { id: houseId } });
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
}
