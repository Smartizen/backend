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
import { Farm } from '../../farm/entities/farm.entity';

@Table
export class Manage extends Model<Manage> {
  @PrimaryKey
  @Column({ defaultValue: DataType.UUIDV4, type: DataType.UUID })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId: string;

  @ForeignKey(() => Farm)
  @Column(DataType.UUID)
  farmId: string;

  @AllowNull(false)
  @Column
  role: number;

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
