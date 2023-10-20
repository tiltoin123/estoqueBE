import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  BelongsToMany,
  BelongsTo,
  ForeignKey
} from "sequelize-typescript";
import User from "./User";
import UserQueue from "./UserQueue";
import Whatsapp from "./Whatsapp";
import WhatsappQueue from "./WhatsappQueue";
import Store from "./Stores";
import StoreAi from "./StoreAi";

@Table
class Queue extends Model<Queue> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  color: string;

  @Column
  greetingMessage: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsToMany(() => Whatsapp, () => WhatsappQueue)
  whatsapps: Array<Whatsapp & { WhatsappQueue: WhatsappQueue }>;

  @BelongsToMany(() => User, () => UserQueue)
  users: Array<User & { UserQueue: UserQueue }>;

  @ForeignKey(() => Store)
  @Column
  storeId: number;

  @BelongsTo(() => Store)
  store: Store

  @ForeignKey(() => StoreAi)
  @Column
  storeAiId: number;

  @BelongsTo(() => StoreAi)
  storeAi: StoreAi;
}

export default Queue;
