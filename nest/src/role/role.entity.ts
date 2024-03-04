import {Column, Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../users/user.entity";
import {Association} from "../associations/association.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @ApiProperty({
        description: 'The name of the role of the given user in the given association',
        example: "President",
        type: String,
    })
    name: string;

    @ManyToOne(type=>User, { eager: true, onDelete:'CASCADE' })
    @JoinTable()
    @ApiProperty({
        description: 'The id of the user',
        example: "1",
        type: User,
    })
    user: User;

    @ManyToOne(type=> Association, { eager: true, onDelete:'CASCADE' })
    @JoinTable()
    @ApiProperty({
        description: 'The association',
        example: "1",
        type: Association,
    })
    association: Association

    constructor(asso : Association, user:User, role:string) {
        this.association=asso;
        this.user=user;
        this.name=role;
    }
}