import {
  Table,
  Model,
  ForeignKey,
  Column,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Crop } from '../../crop/entities/crop.entity';
import { Device } from '../../device/entities/device.entity';

@Table
export class DeviceBelong extends Model<DeviceBelong> {
  @ForeignKey(() => Crop)
  @Column(DataType.UUID)
  cropId: string;

  @ForeignKey(() => Device)
  @Column(DataType.UUID)
  deviceId: string;

  @BelongsTo(() => Device)
  device: Device;

  @BelongsTo(() => Crop)
  crop: Crop;
}
