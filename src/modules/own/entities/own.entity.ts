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
  @Column({ defaultValue: DataType.UUIDV4, type: DataType.UUID })
  id: string;

  @ForeignKey(() => Farm)
  @Column(DataType.UUID)
  farmId: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;
}
