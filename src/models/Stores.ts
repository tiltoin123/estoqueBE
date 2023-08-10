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
import Contact from "./Contact";
import Template from "./Template";
import Whatsapp from "./Whatsapp";
import Queue from "./Queue";
import Ticket from "./Ticket";
import User from "./User";
import WhatsappQueue from "./WhatsappQueue";
import Message from "./Message";



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

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @HasMany(() => Contact)
    contacts: Contact[];

    @HasMany(() => Template)
    template: Template[];

    @HasMany(() => Whatsapp)
    whatsapps: Whatsapp[];

    @HasMany(() => Queue)
    queues: Queue[];

    @HasMany(() => Ticket)
    tickets: Ticket[];

    @HasMany(() => User)
    user: User[];

    @HasMany(() => WhatsappQueue)
    whatsappQueues: WhatsappQueue[];

    @HasMany(() => Message)
    messages: Message[];
}

export default Store;
