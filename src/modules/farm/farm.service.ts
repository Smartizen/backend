import { Injectable, Inject } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from './entities/farm.entity';

@Injectable()
export class FarmService {
  constructor(
    @Inject('FarmRepository')
    private readonly farmRepository: typeof Farm,
  ) {}

  create(createFarmDto: CreateFarmDto) {
    return 'This action adds a new farm';
  }

  findAll() {
    return `This action returns all farm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} farm`;
  }

  update(id: number, updateFarmDto: UpdateFarmDto) {
    return `This action updates a #${id} farm`;
  }

  remove(id: number) {
    return `This action removes a #${id} farm`;
  }
}
