import {
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  AllowNull,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../../users/user.entity';
import { Own } from '../../own/entities/own.entity';
import { Crop } from '../../crop/entities/crop.entity';
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

  @BelongsToMany(() => User, () => Own)
  owners: User[];

  @HasMany(() => Crop)
  crops: Crop[];
}
