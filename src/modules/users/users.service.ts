import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import { User } from './user.entity';
import { USER_REPOSITORY } from '../../core/constants';
import { House } from '../house/entities/house.entity';
import { Room } from '../room/entities/room.entity';

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

  async findAll(user: User) {
    if (user.role === 0) {
      let users = await this.userRepository.findAll({
        where: { role: 1 },
      });
      return { data: users };
    } else {
      return new HttpException(
        {
          message: 'only admin can call this function',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async isOwnHouse(houseId: string, userId: string) {
    try {
      let ishave = this.userRepository.findOne({
        where: { id: userId },
        include: [
          {
            model: House,
            where: { id: houseId },
          },
        ],
      });
      return ishave;
    } catch (error) {
      return error;
    }
  }

  async myHouse(userId: string) {
    try {
      let ishave = this.userRepository.findOne({
        where: { id: userId },
        attributes: [],
        include: [
          {
            model: House,
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

  async myRoomByHouse(userId: string, houseId: string) {
    try {
      let ishave = this.userRepository.findOne({
        where: { id: userId },
        attributes: [],
        include: [
          {
            model: House,
            where: { id: houseId },
            attributes: ['id', 'name', 'image', 'lat', 'long'],
            through: { attributes: [] },
            include: [{ model: Room, attributes: ['id', 'name'] }],
          },
        ],
      });
      return ishave;
    } catch (error) {
      return error;
    }
  }

  async getAllMemberOfHouse(houseId: string) {
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
            model: House,
            where: { id: houseId },
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
