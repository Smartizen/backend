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
    const command = new Command(createCommandDto);
    return await command.save();
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

  remove(id: number) {
    return `This action removes a #${id} command`;
  }
}
