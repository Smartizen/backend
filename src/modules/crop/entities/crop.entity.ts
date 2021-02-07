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
} from 'sequelize-typescript';
import { Farm } from '../../farm/entities/farm.entity';
import { Season } from '../../season/entities/season.entity';
import { DeviceBelong } from '../../device-belong/entities/device-belong.entity';

@Table
export class Crop extends Model<Crop> {
  @PrimaryKey
  @Column({ defaultValue: DataType.UUIDV4, type: DataType.UUID })
  id: string;

  @Column
  name: string;

  @ForeignKey(() => Farm)
  @Column(DataType.UUID)
  farmId: string;

  @BelongsTo(() => Farm)
  farm: Farm;

  @HasMany(() => Season)
  seasons: Season[];

  @HasMany(() => DeviceBelong)
  devides: DeviceBelong[];
}
