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
  HasMany,
} from 'sequelize-typescript';
import { Manage } from '../manage/entities/manage.entity';
import { House } from '../house/entities/house.entity';
import { Messaging } from '../messaging/entities/messaging.entity';
@Table
export class User extends Model<User> {
  @Column({
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
    primaryKey: true,
  })
  id: string;

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
  born: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  role: number;

  @Column({
    type: DataType.ENUM,
    values: ['male', 'female'],
    allowNull: false,
  })
  gender: string;

  @BelongsToMany(() => House, () => Manage)
  houses: House[];

  @HasMany(() => Messaging)
  notifications: Messaging[];

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
