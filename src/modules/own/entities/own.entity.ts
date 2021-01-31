import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Farm } from '../../farm/entities/farm.entity';
import { User } from '../../users/user.entity';

@Table
export class Own extends Model<Own> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @ForeignKey(() => Farm)
  @Column
  farmId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;
}
