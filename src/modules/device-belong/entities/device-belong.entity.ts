import {
  Table,
  Model,
  ForeignKey,
  Column,
  BelongsTo,
} from 'sequelize-typescript';
import { Crop } from '../../crop/entities/crop.entity';
import { Device } from '../../device/entities/device.entity';

@Table
export class DeviceBelong extends Model<DeviceBelong> {
  @ForeignKey(() => Crop)
  @Column
  cropId: number;

  @ForeignKey(() => Device)
  @Column
  deviceId: number;

  @Column
  password: string;

  @BelongsTo(() => Device)
  device: Device;

  @BelongsTo(() => Crop)
  crop: Crop;
}
