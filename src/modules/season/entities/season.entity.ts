import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Room } from '../../room/entities/room.entity';

@Table
export class Season extends Model<Season> {
  @PrimaryKey
  @Column({ defaultValue: DataType.UUIDV4, type: DataType.UUID })
  id: string;

  @ForeignKey(() => Room)
  @Column(DataType.UUID)
  roomId: string;

  @Column(DataType.DATE)
  startTime: Date;

  @Column(DataType.DATE)
  endTime: Date;

  @Column
  description: string;

  @Column
  plant: string;

  @BelongsTo(() => Room)
  room: Room;
}
