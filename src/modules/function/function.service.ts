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

  async create(createFunctionDto: CreateFunctionDto) {
    try {
      const command = new Function(createFunctionDto);
      await command.save();
      return { status: 200, message: 'Add command successfully' };
    } catch (error) {
      return { status: 400, error };
    }
  }

  async findAll() {
    try {
      let functions = await this.functionRepository.findAll({
        attributes: ['id', 'name', 'command', 'description'],
      });
      return functions;
    } catch (error) {
      return { status: 400, error };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} function`;
  }

  update(id: string, updateFunctionDto: UpdateFunctionDto) {
    try {
      this.functionRepository.update(updateFunctionDto, { where: { id } });
      return { status: 200, message: 'Update sucessfully' };
    } catch (error) {
      return { status: 400, message: error };
    }
  }

  remove(id: string) {
    try {
      this.functionRepository.destroy({ where: { id } });
      return { status: 200, message: 'Delete sucessfully' };
    } catch (error) {
      return { status: 400, message: error };
    }
  }
}
