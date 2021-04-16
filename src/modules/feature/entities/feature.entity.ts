import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { DeviceType } from '../../device-type/entities/device-type.entity';
import { Function } from '../../function/entities/function.entity';

@Table
export class Feature extends Model<Feature> {
  @PrimaryKey
  @Column({ defaultValue: DataType.UUIDV4, type: DataType.UUID })
  id: string;

  @ForeignKey(() => DeviceType)
  @Column
  deviceTypeId: string;

  @ForeignKey(() => Function)
  @Column
  functionId: string;

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
