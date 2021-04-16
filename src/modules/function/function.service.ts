import { Injectable, Inject } from '@nestjs/common';
import { CreateFunctionDto } from './dto/create-function.dto';
import { UpdateFunctionDto } from './dto/update-function.dto';
import { Function } from './entities/function.entity';

@Injectable()
export class FunctionService {
  constructor(
    @Inject('FunctionRepository')
    private readonly functionRepository: typeof Function,
  ) {}

  create(createFunctionDto: CreateFunctionDto) {
    return 'This action adds a new function';
  }

  findAll() {
    return `This action returns all function`;
  }

  findOne(id: number) {
    return `This action returns a #${id} function`;
  }

  update(id: number, updateFunctionDto: UpdateFunctionDto) {
    return `This action updates a #${id} function`;
  }

  remove(id: number) {
    return `This action removes a #${id} function`;
  }
}
