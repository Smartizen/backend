import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { DeviceType } from '../../device-type/entities/device-type.entity';

@Table
export class Command extends Model<Command> {
  @PrimaryKey
  @Column({ defaultValue: DataType.UUIDV4, type: DataType.UUID })
  id: string;

  @Column({ allowNull: false })
  command: string;

  @Column
  decription: string;

  @ForeignKey(() => DeviceType)
  @Column
  deviceTypeId: string;

  @BelongsTo(() => DeviceType)
  deviceType: DeviceType;

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
