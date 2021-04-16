import { Injectable, Inject } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from './entities/farm.entity';
import { Manage } from '../manage/entities/manage.entity';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { Crop } from '../crop/entities/crop.entity';
import { Sequelize } from 'sequelize';
import sequelize = require('sequelize');
import { Active } from '../active/entities/active.entity';

@Injectable()
export class FarmService {
  constructor(
    private readonly userService: UsersService,

    @Inject('FarmRepository')
    private readonly farmRepository: typeof Farm,
  ) {}

  async create(createFarmDto: CreateFarmDto, userId: string) {
    try {
      let farm = new Farm(createFarmDto);
      farm = await farm.save();
      const mange = new Manage({
        userId,
        farmId: farm.id,
        role: 0,
      });
      await mange.save();
      return {
        status: 200,
        data: {
          id: farm.id,
          name: farm.name,
          image: farm.image,
          location: farm.location,
        },
        message: 'Create Successfully',
      };
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return `This action returns all farm`;
  }

  async findAllMyFarm(userId: string) {
    return await this.userService.myFarm(userId);
  }

  async findOne(id: string) {
    const farm = await this.farmRepository.findOne({
      attributes: ['id', 'name', 'image', 'location'],
      where: { id },
      include: [
        {
          model: User,
          attributes: ['firstname', 'lastname'],
          through: { attributes: ['role'] },
        },
        {
          model: Crop,
          attributes: ['id', 'name'],
          include: [
            {
              model: Active,
            },
          ],
        },
      ],
    });
    return farm;
  }

  update(id: number, updateFarmDto: UpdateFarmDto) {
    return `This action updates a #${id} farm`;
  }

  remove(id: number) {
    return `This action removes a #${id} farm`;
  }
}
