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
  BelongsToMany,
} from 'sequelize-typescript';
import { Season } from '../../season/entities/season.entity';
import { Active } from '../../active/entities/active.entity';
import { House } from '../../house/entities/house.entity';
import { Device } from '../../device/entities/device.entity';

@Table
export class Room extends Model<Room> {
  @PrimaryKey
  @Column({ defaultValue: DataType.UUIDV4, type: DataType.UUID })
  id: string;

  @Column
  name: string;

  @Column
  image: string;

  @ForeignKey(() => House)
  @Column(DataType.UUID)
  houseId: string;

  @BelongsTo(() => House)
  house: House;

  @HasMany(() => Season)
  seasons: Season[];

  @HasMany(() => Active)
  actives: Active[];

  @BelongsToMany(() => Device, () => Active)
  devices: Device[];

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
