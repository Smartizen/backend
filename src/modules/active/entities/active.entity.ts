import {
  Table,
  Model,
  ForeignKey,
  Column,
  BelongsTo,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';
import { Crop } from '../../crop/entities/crop.entity';
import { Device } from '../../device/entities/device.entity';

@Table
export class Active extends Model<Active> {
  @PrimaryKey
  @Column({ defaultValue: DataType.UUIDV4, type: DataType.UUID })
  id: string;

  @ForeignKey(() => Crop)
  @Column(DataType.UUID)
  cropId: string;

  @ForeignKey(() => Device)
  @Column
  deviceId: string;

  @BelongsTo(() => Device, 'deviceId')
  device: Device;

  @BelongsTo(() => Crop)
  crop: Crop;
}
