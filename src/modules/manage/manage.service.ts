import { Injectable, Inject } from '@nestjs/common';
import { CreateManageDto } from './dto/create-manage.dto';
import { UpdateManageDto } from './dto/update-manage.dto';
import { Manage } from './entities/manage.entity';

@Injectable()
export class ManageService {
  constructor(
    @Inject('ManageRepository')
    private readonly manageRepository: typeof Manage,
  ) {}

  create(createManageDto: CreateManageDto) {
    return 'This action adds a new manage';
  }

  async findAll() {
    // const manage = await this.manageRepository.findAll<Manage>();
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
