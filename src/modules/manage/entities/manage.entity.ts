import {
  Table,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  UpdatedAt,
  CreatedAt,
  DeletedAt,
  Model,
} from 'sequelize-typescript';
import { User } from '../../users/user.entity';

@Table
export class Manage extends Model<Manage> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  masterId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  staffId: string;

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
