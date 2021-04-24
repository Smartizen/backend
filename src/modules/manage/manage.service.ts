import { Injectable, Inject } from '@nestjs/common';
import { CreateManageDto } from './dto/create-manage.dto';
import { UpdateManageDto } from './dto/update-manage.dto';
import { Manage } from './entities/manage.entity';
import { SignUpDto } from '../auth/dto/auth.dto';
import { UsersService } from '../users/users.service';

var bcrypt = require('bcryptjs');
@Injectable()
export class ManageService {
  constructor(
    private readonly userService: UsersService,

    @Inject('ManageRepository')
    private readonly manageRepository: typeof Manage,
  ) {}

  async create(signUpDto: SignUpDto, userId: string, houseId: string) {
    const { firstname, lastname, email, password, gender } = signUpDto;

    if (this.isAdminOfHouse(userId, houseId)) {
      // hash the password
      const hashedPass = await bcrypt.hashSync(password, 10);
      try {
        // create the user
        const newUser = await this.userService.create(
          firstname,
          lastname,
          email,
          hashedPass, //password
          gender,
          1, //role
        );
        const manage = new Manage({
          userId: newUser.id,
          houseId,
          role: 1,
        });
        manage.save();
        let payload = {
          id: newUser.id,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          email: newUser.email,
        };
        return { status: 200, message: 'Create succesfully', data: payload };
      } catch (error) {
        return { status: 400, error };
      }
    } else {
      return { status: 400, message: "You can't add user" };
    }
  }

  async addByEmail(createManageDto: CreateManageDto, userId: string) {
    let { houseId, email } = createManageDto;
    if (this.isAdminOfHouse(userId, houseId)) {
      let user = await this.userService.findOneByEmail(email);
      const manage = new Manage({
        userId: user.id,
        houseId,
        role: 1,
      });
      manage.save();
      let payload = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      };
      return { status: 200, message: 'Add user successfully', data: payload };
    } else {
      return { status: 400, message: "You can't add user" };
    }
  }

  async getAllStaff(userId: string, houseId: string) {
    if (this.isMemberOfHouse(userId, houseId)) {
      const staff = await this.userService.getAllMemberOfHouse(houseId);
      return staff;
    } else {
      return { status: 400, message: "You're not member of this house" };
    }
  }

  async findAll() {
    const manage = await this.manageRepository.findAll<Manage>();
    return `manage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manage`;
  }

  update(id: number, updateManageDto: UpdateManageDto) {
    return `This action updates a #${id} manage`;
  }

  remove(id: number) {
    return `This action removes a #${id} manage`;
  }

  async isAdminOfHouse(userId: string, houseId: string) {
    let isAdmin = await this.manageRepository.findOne({
      attributes: ['role'],
      where: { userId, houseId },
    });

    if (isAdmin.role === 0) return true;
    else return false;
  }

  async isMemberOfHouse(userId: string, houseId: string) {
    let isMember = await this.manageRepository.findOne({
      attributes: ['role'],
      where: { userId, houseId },
    });

    return !!isMember;
  }
}
