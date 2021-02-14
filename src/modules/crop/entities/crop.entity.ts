import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
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

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt: Date;
}
