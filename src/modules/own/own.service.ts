import { Injectable } from '@nestjs/common';
import { CreateOwnDto } from './dto/create-own.dto';
import { UpdateOwnDto } from './dto/update-own.dto';

@Injectable()
export class OwnService {
  create(createOwnDto: CreateOwnDto) {
    return 'This action adds a new own';
  }

  findAll() {
    return `This action returns all own`;
  }

  findOne(id: number) {
    return `This action returns a #${id} own`;
  }

  update(id: number, updateOwnDto: UpdateOwnDto) {
    return `This action updates a #${id} own`;
  }

  remove(id: number) {
    return `This action removes a #${id} own`;
  }
}
