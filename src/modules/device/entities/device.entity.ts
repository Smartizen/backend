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
import { Buy } from '../../buy/entities/buy.entity';
import { DeviceBelong } from '../../device-belong/entities/device-belong.entity';
import { DeviceType } from '../../device-type/entities/device-type.entity';

@Table
export class Device extends Model<Device> {
  @Column({ defaultValue: DataType.UUIDV4, type: DataType.UUID })
  id: string;

  @ForeignKey(() => DeviceType)
  @Column
  typeId: string;

  @BelongsTo(() => DeviceType)
  deviceType: DeviceType;

  @PrimaryKey
  @Column({ allowNull: false })
  deviceId: string;

  @HasMany(() => DeviceBelong)
  deviceBelong: DeviceBelong[];

  @Column
  authToken: string;

  @Column
  description: string;

  @Column(DataType.INTEGER)
  price: number;

  @BelongsToMany(() => User, () => Buy)
  purchasedBy: User[];

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
