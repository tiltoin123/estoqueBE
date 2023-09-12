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
import Template from "./Template";

@Table({
    tableName: "TemplateControls",
})
class TemplateControls extends Model<TemplateControls> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER })
    id: number;

    @Column({ type: DataType.TEXT })
    valor: string;

    @Column({ type: DataType.INTEGER })
    choice: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @Column({ type: DataType.BOOLEAN })
    backMenu: boolean

    @ForeignKey(() => Template)
    @Column
    templateId: number;

    @BelongsTo(() => Template)
    template: Template
}

export default TemplateControls;
