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
    DataType,
    Unique,
    HasMany, // Import this decorator
} from "sequelize-typescript";
import Store from "./Stores";
import Queue from "./Queue";

@Table({
    tableName: "StoreAi",
})
class StoreAi extends Model<StoreAi> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    id: number;

    @Column({ type: DataType.TEXT })
    name: string;

    @Column({ type: DataType.TEXT })
    systemPrompt: string;

    @ForeignKey(() => Store)
    @Column
    storeId: number;

    @BelongsTo(() => Store)
    store: Store;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @HasMany(() => Queue)
    queues: Queue[];
}

export default StoreAi;
