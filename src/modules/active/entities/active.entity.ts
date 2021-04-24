import {
  Table,
  Model,
  ForeignKey,
  Column,
  BelongsTo,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';
import { Device } from '../../device/entities/device.entity';
import { Room } from '../../room/entities/room.entity';

@Table
export class Active extends Model<Active> {
  @PrimaryKey
  @Column({ defaultValue: DataType.UUIDV4, type: DataType.UUID })
  id: string;

  @ForeignKey(() => Room)
  @Column(DataType.UUID)
  roomId: string;

  @ForeignKey(() => Device)
  @Column
  deviceId: string;

  @BelongsTo(() => Device, 'deviceId')
  device: Device;

  @BelongsTo(() => Room)
  room: Room;
}
