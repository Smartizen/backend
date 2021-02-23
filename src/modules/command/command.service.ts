import { Injectable, Inject } from '@nestjs/common';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { Command } from './entities/command.entity';

@Injectable()
export class CommandService {
  constructor(
    @Inject('CommandRepository')
    private readonly commandRepository: typeof Command,
  ) {}

  async create(createCommandDto: CreateCommandDto) {
    try {
      const command = new Command(createCommandDto);
      await command.save();
      return { status: 200, message: 'Add command successfully' };
    } catch (error) {
      return { status: 400, error };
    }
  }

  async findAll() {
    return await this.commandRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} command`;
  }

  update(id: number, updateCommandDto: UpdateCommandDto) {
    return `This action updates a #${id} command`;
  }

  remove(id: string) {
    try {
      this.commandRepository.destroy({ where: { id } });
      return { status: 200, message: 'Delete sucessfully' };
    } catch (error) {
      return { status: 400, message: error };
    }
  }
}
