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
    Unique
} from "sequelize-typescript";
import User from "./User";




@Table
class Store extends Model<Store> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Unique
    @Column
    name: string;

    @AllowNull(false)
    @Unique
    @Column
    email: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;


    @HasMany(() => User)
    user: User[];

}

export default Store;
