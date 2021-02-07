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
  @Column({ defaultValue: DataType.UUIDV4, type: DataType.UUID })
  id: string;

  @ForeignKey(() => Crop)
  @Column(DataType.UUID)
  cropId: string;

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
