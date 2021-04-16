import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasMany,
  Unique,
  BelongsToMany,
} from 'sequelize-typescript';

import { Device } from '../../device/entities/device.entity';
import { Function } from '../../function/entities/function.entity';
import { Feature } from '../../feature/entities/feature.entity';

@Table
export class DeviceType extends Model<DeviceType> {
  @Column({ defaultValue: DataType.UUIDV4, type: DataType.UUID })
  id: string;

  @Unique
  @PrimaryKey
  @Column({ allowNull: false })
  typeId: string;

  @HasMany(() => Device)
  devices: Device[];

  @BelongsToMany(() => Function, () => Feature)
  functions: Function[];

  @Column
  description: string;

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
