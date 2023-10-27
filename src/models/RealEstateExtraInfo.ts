import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo
} from "sequelize-typescript";
import RealEstate from "./RealEstate";

@Table
class RealEstateExtraInfo extends Model<RealEstateExtraInfo> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    name: string;

    @Column
    value: string;

    @ForeignKey(() => RealEstate)
    @Column
    realEstateId: number;

    @BelongsTo(() => RealEstate)
    realestate: RealEstate;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}

export default RealEstateExtraInfo;
