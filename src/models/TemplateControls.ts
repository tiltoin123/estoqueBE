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

@Table
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

    @ForeignKey(() => Template)
    @Column
    templateId: number;

    @BelongsTo(() => Template)
    template: Template
}

export default TemplateControls;
