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
import { Crop } from '../../crop/entities/crop.entity';
import { Manage } from '../../manage/entities/manage.entity';
@Table
export class Farm extends Model<Farm> {
  @PrimaryKey
  @Column({ defaultValue: DataType.UUIDV4, type: DataType.UUID })
  id: string;

  @AllowNull
  @Column
  name: string;

  @AllowNull
  @Column
  image: string;

  @AllowNull
  @Column
  location: string;

  @BelongsToMany(() => User, () => Manage)
  members: User[];

  @HasMany(() => Crop)
  crops: Crop[];

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
