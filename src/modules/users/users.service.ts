import { Injectable, Inject } from '@nestjs/common';

import { User } from './user.entity';
import { USER_REPOSITORY } from '../../core/constants';
import { Farm } from '../farm/entities/farm.entity';
import { Crop } from '../crop/entities/crop.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    gender: string,
    role: number,
  ): Promise<User> {
    const user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.password = password;
    user.gender = gender;
    user.role = role;

    return await user.save();
  }

  // async updateUser()

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async isOwnFarm(farmId: string, userId: string) {
    try {
      let ishave = this.userRepository.findOne({
        where: { id: userId },
        include: [
          {
            model: Farm,
            where: { id: farmId },
          },
        ],
      });
      return ishave;
    } catch (error) {
      return error;
    }
  }

  async myFarm(userId: string) {
    try {
      let ishave = this.userRepository.findOne({
        where: { id: userId },
        attributes: [],
        include: [
          {
            model: Farm,
            attributes: ['id', 'name', 'image', 'lat', 'long'],
            through: { attributes: [] },
          },
        ],
      });
      return ishave;
    } catch (error) {
      return error;
    }
  }

  async myCropByFarm(userId: string, farmId: string) {
    try {
      let ishave = this.userRepository.findOne({
        where: { id: userId },
        attributes: [],
        include: [
          {
            model: Farm,
            where: { id: farmId },
            attributes: ['id', 'name', 'image', 'lat', 'long'],
            through: { attributes: [] },
            include: [{ model: Crop, attributes: ['id', 'name'] }],
          },
        ],
      });
      return ishave;
    } catch (error) {
      return error;
    }
  }

  async getAllMemberOfFarm(farmId: string) {
    try {
      let member = this.userRepository.findAll({
        where: {},
        attributes: [
          'id',
          'firstname',
          'lastname',
          'email',
          'image',
          'phonenumber',
          'gender',
        ],
        include: [
          {
            model: Farm,
            where: { id: farmId },
            attributes: [],
          },
        ],
      });
      return member;
    } catch (error) {
      return error;
    }
  }
}
