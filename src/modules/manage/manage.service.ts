import { Injectable, Inject } from '@nestjs/common';
// import { CreateManageDto } from './dto/create-manage.dto';
import { UpdateManageDto } from './dto/update-manage.dto';
import { Manage } from './entities/manage.entity';
import { SignUpDto } from '../auth/dto/auth.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
var bcrypt = require('bcryptjs');
@Injectable()
export class ManageService {
  constructor(
    private readonly userService: UsersService,

    @Inject('ManageRepository')
    private readonly manageRepository: typeof Manage,
  ) {}

  async create(signUpDto: SignUpDto, masterId: string) {
    const { firstname, lastname, email, password, gender } = signUpDto;
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
        masterId,
        staffId: newUser.id,
      });
      manage.save();
      return { status: 200, message: 'Create succesfully' };
    } catch (error) {
      return { status: 400, error };
    }
  }

  async getAllStaff(masterId: string) {
    const staff = await this.manageRepository.findAll({
      where: { masterId },
      include: [User],
    });
    return staff;
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
}
