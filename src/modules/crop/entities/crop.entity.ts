import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Farm } from '../../farm/entities/farm.entity';

@Table
export class Crop extends Model<Crop> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column
  name: string;

  @ForeignKey(() => Farm)
  @Column
  farmId: number;

  @BelongsTo(() => Farm)
  farm: Farm;
}
