import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import { User } from './user.entity';
import { House } from '../house/entities/house.entity';
import { Room } from '../room/entities/room.entity';
import { Manage } from '../manage/entities/manage.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('userRepository') private readonly userRepository: typeof User,
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
      let members = await this.userRepository.findAll({
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
          },
        ],
      });

      // convert
      let data = await members.map(member => {
        let newMember = {
          id: null,
          firstname: null,
          lastname: null,
          email: null,
          image: null,
          phonenumber: null,
          gender: null,
          role: null,
          manageId: null,
        };
        newMember.id = member['id'];
        newMember.firstname = member['firstname'];
        newMember.lastname = member['lastname'];
        newMember.email = member['email'];
        newMember.image = member['image'];
        newMember.phonenumber = member['phonenumber'];
        newMember.gender = member['gender'];
        newMember.role = member.houses[0]['Manage'].role;
        newMember.manageId = member.houses[0]['Manage'].id;
        return newMember;
      });

      return data;
    } catch (error) {
      return error;
    }
  }
}
