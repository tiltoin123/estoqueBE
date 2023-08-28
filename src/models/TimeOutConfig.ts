import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
    Unique
} from "sequelize-typescript";
import Store from "./Stores";

@Table
class TimeOutConfig extends Model<TimeOutConfig> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    status: boolean;

    @Column
    minutesDuration: number;

    @Column
    notice: string

    @ForeignKey(() => Store)
    @Unique
    @Column
    storeId: number;

    @BelongsTo(() => Store)
    store: Store;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}

export default TimeOutConfig;
