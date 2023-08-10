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
    tableName: "emplateControls",
})
class TemplateControls extends Model<TemplateControls> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER })
    id: number;

    @Column({ type: DataType.TEXT })
    valor: string;

    @Column({ type: DataType.INTEGER })
    choice: number

    @ForeignKey(() => Template)
    @Column
    templateId: number;

    @BelongsTo(() => Template)
    template: Template
}

export default TemplateControls;
