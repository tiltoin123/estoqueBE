import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    PrimaryKey,
    AutoIncrement,
    HasMany,
    AllowNull,
    Unique,
    BelongsTo,
    ForeignKey
} from "sequelize-typescript";
import Store from "./Stores";

@Table
class StoreLinks extends Model<StoreLinks> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Unique
    @Column
    name: string;

    @AllowNull(false)
    @Column
    utility: string;//menu drop down

    @AllowNull(false)
    @Unique
    @Column
    link: string;

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

export default StoreLinks;
