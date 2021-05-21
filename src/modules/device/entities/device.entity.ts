import {
  Table,
  Model,
  PrimaryKey,
  ForeignKey,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsToMany,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../../users/user.entity';
import { DeviceType } from '../../device-type/entities/device-type.entity';
import { Active } from '../../active/entities/active.entity';

@Table
export class Device extends Model<Device> {
  @Column({ defaultValue: DataType.UUIDV4, type: DataType.UUID })
  id: string;

  @ForeignKey(() => DeviceType)
  @Column
  typeId: string;

  @Column
  authToken: string;

  @Column
  description: string;

  @BelongsTo(() => DeviceType)
  deviceType: DeviceType;

  @PrimaryKey
  @Column({ allowNull: false })
  deviceId: string;

  @HasMany(() => Active)
  active: Active[];

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
