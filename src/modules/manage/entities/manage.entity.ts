import {
  Table,
  PrimaryKey,
  Column,
  DataType,
  ForeignKey,
  UpdatedAt,
  CreatedAt,
  DeletedAt,
  Model,
  AllowNull,
} from 'sequelize-typescript';
import { User } from '../../users/user.entity';
import { House } from '../../house/entities/house.entity';

@Table
export class Manage extends Model<Manage> {
  @PrimaryKey
  @Column({ defaultValue: DataType.UUIDV4, type: DataType.UUID })
  id: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @ForeignKey(() => House)
  @Column(DataType.UUID)
  houseId: string;

  @AllowNull(false)
  @Column
  role: number;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
