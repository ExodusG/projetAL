import { ApiProperty } from "@nestjs/swagger"
import {UserInput} from "../users/userInput";
import {User} from "../users/user.entity";

export class AssociationInput{


    @ApiProperty({
        description: 'All the id of the user of the association',
        type:[Number],
    })
    idUsers: number[]


    @ApiProperty({
        description: 'The name of the association',
        example: "Association 1",
        type: String,
    })
    name:string

}

export class AssociationOutput{


    @ApiProperty({
        description: 'All the id of the user of the association',
        type:[UserInput],
    })
    users: User[]


    @ApiProperty({
        description: 'The name of the association',
        example: "Association 1",
        type: String,
    })
    name:string

}
