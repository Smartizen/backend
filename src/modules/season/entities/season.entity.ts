import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Crop } from '../../crop/entities/crop.entity';

@Table
export class Season extends Model<Season> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @ForeignKey(() => Crop)
  cropId: number;

  @Column(DataType.DATE)
  startTime: Date;

  @Column(DataType.DATE)
  endTime: Date;

  @Column
  description: string;

  @Column
  plant: string;

  @BelongsTo(() => Crop)
  crop: Crop;
}
