import {
  Table,
  Column,
  Model,
  DataType,
  IsEmail,
  Unique,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsToMany,
  AutoIncrement,
} from 'sequelize-typescript';
import { Manage } from '../manage/entities/manage.entity';
import { Farm } from '../farm/entities/farm.entity';
import { Own } from '../own/entities/own.entity';
@Table
export class User extends Model<User> {
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastname: string;

  @IsEmail
  @Unique
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phonenumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  role: number;

  @Column({
    type: DataType.ENUM,
    values: ['male', 'female'],
    allowNull: false,
  })
  gender: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt: Date;

  @BelongsToMany(() => User, () => Manage)
  masters: User[];

  @BelongsToMany(() => User, () => Manage)
  staffs: User[];

  @BelongsToMany(() => Farm, () => Own)
  farms: Farm[];
}
