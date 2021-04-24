import {
  Model,
  Table,
  PrimaryKey,
  Column,
  DataType,
  AllowNull,
  BelongsToMany,
  HasMany,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { User } from '../../users/user.entity';
import { Manage } from '../../manage/entities/manage.entity';
import { Room } from '../../room/entities/room.entity';
@Table
export class House extends Model<House> {
  @PrimaryKey
  @Column({ defaultValue: DataType.UUIDV4, type: DataType.UUID })
  id: string;

  @Column
  name: string;

  @AllowNull
  @Column
  image: string;

  @Column
  lat: string;

  @Column
  long: string;

  @BelongsToMany(() => User, () => Manage)
  members: User[];

  @HasMany(() => Room)
  rooms: Room[];

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
