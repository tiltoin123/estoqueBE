import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import Template from "./Template";

@Table({
    tableName: "templateItems",
})
class TemplateItems extends Model<TemplateItems> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER })
    id: number;

    @Column({ type: DataType.TEXT })
    item: string;

    @ForeignKey(() => Template)
    @Column
    templateId: number;

    @BelongsTo(() => Template)
    template: Template
}

export default TemplateItems;
