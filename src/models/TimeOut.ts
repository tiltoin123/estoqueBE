import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    DataType,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import Contact from "./Contact";
import Store from "./Stores";

@Table({
    tableName: "timeout",
})
class TimeOut extends Model<TimeOut> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER })
    id: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @ForeignKey(() => Contact)
    @Column
    contactId: number;

    @BelongsTo(() => Contact)
    contact: Contact

    @ForeignKey(() => Store)
    @Column
    storeId: number;

    @BelongsTo(() => Store)
    store: Store
}

export default TimeOut;
