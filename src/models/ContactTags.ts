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
} from "sequelize-typescript";
import Contact from "./Contact";
import Store from "./Stores";

@Table({
    tableName: "ContactTags",
})
class ContactTags extends Model<ContactTags> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    tagName: string;

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

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}

export default ContactTags;
