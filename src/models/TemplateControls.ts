import {
    Table,
    Column,
<<<<<<< HEAD
    CreatedAt,
    UpdatedAt,
=======
>>>>>>> 8265a1d (comecei o templateControls, branch quebrada)
    Model,
    DataType,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import Template from "./Template";
<<<<<<< HEAD
@Table({
    tableName: "templatecontrols",
=======

@Table({
    tableName: "emplateControls",
>>>>>>> 8265a1d (comecei o templateControls, branch quebrada)
})
class TemplateControls extends Model<TemplateControls> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER })
    id: number;

    @Column({ type: DataType.TEXT })
    valor: string;

    @Column({ type: DataType.INTEGER })
<<<<<<< HEAD
    choice: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
=======
    choice: number
>>>>>>> 8265a1d (comecei o templateControls, branch quebrada)

    @ForeignKey(() => Template)
    @Column
    templateId: number;

    @BelongsTo(() => Template)
    template: Template
}

export default TemplateControls;
