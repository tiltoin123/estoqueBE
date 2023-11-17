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
import Suppliers from "./Suppliers";

@Table
class Products extends Model<Products> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    price: number;

    @AllowNull(false)
    @Column
    description: string

    @AllowNull(false)
    @Column
    unity: string;

    @AllowNull(false)
    @Column
    quantity: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @ForeignKey(() => Store)
    @Column
    storeId: number;

    @BelongsTo(() => Store)
    store: Store

    @ForeignKey(() => Suppliers)
    @Column
    supplierId: number;

    @BelongsTo(() => Suppliers)
    supplier: Suppliers
}

export default Products;
