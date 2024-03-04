import {Body, Controller, Delete, Get, HttpException, Param, Post, Put} from '@nestjs/common';
import {AssociationsService} from "./associations.service";
import {Association} from "./association.entity";
import {User} from "../users/user.entity";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AssociationInput, AssociationOutput} from "./associationInput";
import {UserInput} from "../users/userInput";

@ApiTags('associations')
@Controller('associations')
export class AssociationsController {
    constructor(private associationService: AssociationsService) {
    }

    @ApiOkResponse({
        description: 'succeful get all association',
        type: [AssociationOutput]
    })
    @ApiOperation({ description: 'Get all associations' })
    @Get("")
    async getAll(): Promise<Association[]> {
        return await this.associationService.getAssociations();
    }

    @ApiOkResponse({
        description: 'succeful get the association',
        type: AssociationOutput
    })
    @ApiOperation({ description: 'Get an association with the id' })
    @Get(":id")
    async getAssociationById(@Param('id') id:number): Promise<Association> {
        const association: Association = await this.associationService.getAssociationById(+id);
        if (!association) {
            throw new HttpException('association not found', 404);
        }
        return association;
    }

    @ApiOkResponse({
        description: 'succeful update the association',
        type: Boolean
    })
    @ApiOperation({ description: 'update an association with the id' })
    @Put(":id")
    updateAssociation(@Param('id') id:number, @Body() body: AssociationInput) : boolean {
        if (!body.idUsers || !body.name) {
            throw new HttpException('missing parameters', 400);
        }
        if (!this.associationService.updateAssociation(+id,body.idUsers,body.name)) {
            throw new HttpException('association not found', 404);
        }
        return true;
    }

    @ApiOkResponse({
        description: 'succeful remove an user of the association',
        type: Boolean
    })
    @ApiOperation({ description: 'delete an user of the association with the id' })
    @Delete(":id/removeUser/:idUser")
    removeUserFromAssociation(@Param('id') id : number, @Param('idUser') idUser : number) : boolean {
        if (!this.associationService.removeUserFromAssociation(+id, +idUser)) {
            throw new HttpException('association not found', 404);
        }
        return true;
    }

    @ApiOkResponse({
        description: 'succeful add an user of the association',
        type: Boolean
    })
    @ApiOperation({ description: 'add an user of the association with the id' })
    @Put(":id/addUser/:idUser")
    addUserToAssociation(@Param('id') id:number, @Param('idUser') idUser:number) : boolean {
        if (!this.associationService.addUserToAssociation(+id,+idUser)) {
            throw new HttpException('association not found', 404);
        }
        return true;
    }

    @ApiOkResponse({
        description: 'succeful delete the association',
        type: Boolean
    })
    @ApiOperation({ description: 'delete the association with the id' })
    @Delete(":id")
    deleteAssociation(@Param('id') id: number) : boolean {
        if (!this.associationService.deleteAssociation(+id)) {
            throw new HttpException('association not found', 404);
        }
        return true;
    }

    @ApiOkResponse({
        description: 'succeful create the association',
        type: Boolean
    })
    @ApiOperation({ description: 'create the association' })
    @Post()
    async create(@Body() input: AssociationInput): Promise<boolean> {
        if (!input.idUsers || !input.name) {
            throw new HttpException('missing parameters', 400);
        }
        return await this.associationService.createAssociation(input.name, input.idUsers);
    }

    @ApiOkResponse({
        description: 'succeful get all users of the association',
        type: [UserInput]
    })
    @ApiOperation({ description: 'get all users of the association with the id' })
    @Get(":id/members")
    async getMembers(@Param('id') id:number): Promise<User[]> {
        return await this.associationService.getMembers(+id);
    }

}
