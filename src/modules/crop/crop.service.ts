import { Injectable, Inject } from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { Crop } from './entities/crop.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class CropService {
  constructor(
    @Inject('CropRepository')
    private readonly cropRepository: typeof Crop,

    private readonly userService: UsersService,
  ) {}

  async create(createCropDto: CreateCropDto, userId: string) {
    let { farmId } = createCropDto;
    let userOwns = await this.userService.isOwnFarm(farmId, userId);
    if (!!userOwns) {
      let corp = new Crop(createCropDto);
      let newCrop = await corp.save();
      return { status: 200, data: newCrop };
    } else {
      return { status: 401, message: 'User not belong this farm' };
    }
  }

  findAll() {
    return `This action returns all crop`;
  }

  async findAllMyCrop(userId: string, farmId: string) {
    return await this.userService.myCropByFarm(userId, farmId);
  }

  findOne(id: number) {
    return `This action returns a #${id} crop`;
  }

  update(id: number, updateCropDto: UpdateCropDto) {
    return `This action updates a #${id} crop`;
  }

  remove(id: number) {
    return `This action removes a #${id} crop`;
  }
}
