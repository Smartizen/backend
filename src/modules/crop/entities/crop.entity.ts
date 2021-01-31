import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  AutoIncrement,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Farm } from '../../farm/entities/farm.entity';
import { Season } from '../../season/entities/season.entity';
import { DeviceBelong } from '../../device-belong/entities/device-belong.entity';

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

  @HasMany(() => Season)
  seasons: Season[];

  @HasMany(() => DeviceBelong)
  devides: DeviceBelong[];
}
