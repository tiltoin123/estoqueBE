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
    ForeignKey,
    BelongsTo
} from "sequelize-typescript";
import User from "./User";
import Store from "./Stores";




@Table
class Suppliers extends Model<Suppliers> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    cnpj: string;

    @AllowNull(false)
    @Column
    razaoSocial: string;

    @AllowNull(false)
    @Column
    nomeFantasia: string;

    @AllowNull(false)
    @Column
    tipoJur: string;

    @AllowNull(false)
    @Column
    endereco: string;

    @AllowNull(false)
    @Column
    email: string;

    @AllowNull(false)
    @Column
    telefone: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;


    @ForeignKey(() => Store)
    @Column
    storeId: number;

    @BelongsTo(() => Store)
    store: Store

}

export default Suppliers;
