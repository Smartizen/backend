import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from '../../users/user.entity';
import { Buy } from '../../buy/entities/buy.entity';

@Table
export class Device extends Model<Device> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column
  name: string;

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
