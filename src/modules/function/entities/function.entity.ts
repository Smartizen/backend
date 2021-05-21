import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsToMany,
} from 'sequelize-typescript';
import { DeviceType } from '../../device-type/entities/device-type.entity';
import { Feature } from '../../feature/entities/feature.entity';

@Table
export class Function extends Model<Function> {
  @PrimaryKey
  @Column({ defaultValue: DataType.UUIDV4, type: DataType.UUID })
  id: string;

  @Column({ allowNull: true })
  command: string;

  @Column({ allowNull: false })
  name: string;

  @Column
  description: string;

  @BelongsToMany(() => DeviceType, () => Feature)
  deviceType: DeviceType[];

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
