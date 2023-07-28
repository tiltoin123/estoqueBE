import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import Queue from "./Queue";
import Store from "./Stores";

@Table
class Template extends Model<Template> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER })
    id: number;

    @Column({ type: DataType.TEXT })
    message: string;

    @Column({ type: DataType.INTEGER, defaultValue: null })
    lastMessage: number | null;

    @Column({ type: DataType.INTEGER, defaultValue: null })
    nextMessage: number | null;

    @Column({ type: DataType.STRING, defaultValue: null })
    condition: string | null;

    @ForeignKey(() => Queue)
    @Column
    queueId: number;

    @BelongsTo(() => Queue)
    queue: Queue;

    @ForeignKey(() => Store)
    @Column
    storeId: number;

    @BelongsTo(() => Store)
    store: Store
}

export default Template;
