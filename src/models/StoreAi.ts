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
} from "sequelize-typescript";
import Store from "./Stores";

@Table({
    tableName: "StoreAi",
})
class StoreAi extends Model<StoreAi> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    id: number;

    @Unique
    @Column({ type: DataType.TEXT })
    name: string

    @Column({ type: DataType.TEXT })
    systemPrompt: string;

    @ForeignKey(() => Store)
    @Column
    storeId: number;

    @BelongsTo(() => Store)
    store: Store

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}

export default StoreAi;
