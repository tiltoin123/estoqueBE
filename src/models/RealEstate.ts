import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    DataType,
    BeforeCreate,
    BeforeUpdate,
    PrimaryKey,
    AutoIncrement,
    Default,
    HasMany,
    BelongsToMany,
    ForeignKey,
    BelongsTo,
    AllowNull,
    Unique
} from "sequelize-typescript";
import { hash, compare } from "bcryptjs";
import Ticket from "./Ticket";
import Queue from "./Queue";
import UserQueue from "./UserQueue";
import Whatsapp from "./Whatsapp";
import Store from "./Stores";

@Table
class RealEstate extends Model<RealEstate> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    type: string;

    @AllowNull(false)
    @Unique
    @Column
    state: string;

    @Column
    city: string;

    @Column
    district: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @ForeignKey(() => Store)
    @Column
    storeId: number;

    @BelongsTo(() => Store)
    store: Store

}

export default RealEstate;
