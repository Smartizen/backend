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

  async create(signUpDto: SignUpDto, userId: string, farmId: string) {
    const { firstname, lastname, email, password, gender } = signUpDto;

    if (this.isAdminOfFarm(userId, farmId)) {
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
          farmId,
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
    let { farmId, email } = createManageDto;
    if (this.isAdminOfFarm(userId, farmId)) {
      let user = await this.userService.findOneByEmail(email);
      const manage = new Manage({
        userId: user.id,
        farmId,
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

  async getAllStaff(userId: string, farmId: string) {
    if (this.isMemberOfFarm(userId, farmId)) {
      const staff = await this.userService.getAllMemberOfFarm(farmId);
      return staff;
    } else {
      return { status: 400, message: "You're not member of this farm" };
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

  async isAdminOfFarm(userId: string, farmId: string) {
    let isAdmin = await this.manageRepository.findOne({
      attributes: ['role'],
      where: { userId, farmId },
    });

    if (isAdmin.role === 0) return true;
    else return false;
  }

  async isMemberOfFarm(userId: string, farmId: string) {
    let isMember = await this.manageRepository.findOne({
      attributes: ['role'],
      where: { userId, farmId },
    });

    return !!isMember;
  }
}
