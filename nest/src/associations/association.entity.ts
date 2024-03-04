import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../users/user.entity";
import {JoinTable} from "typeorm";

@Entity()
export class Association {
    @PrimaryGeneratedColumn()
    public id: number;
    @ManyToMany(() => User, {eager: true})
    @JoinTable()
    public users: User[];
    @Column()
    public name: string;
}