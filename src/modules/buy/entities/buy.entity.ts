import {
  Table,
  Model,
  ForeignKey,
  Column,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { Device } from '../../device/entities/device.entity';
import { User } from '../../users/user.entity';

@Table
export class Buy extends Model<Buy> {
  @ForeignKey(() => Device)
  @Column
  deviceId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column
  location: string;

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
