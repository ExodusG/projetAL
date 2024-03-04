import {Body, Controller, Delete, Get, HttpException, Param, Post, Put} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import {Role} from "./role.entity";
import {RoleService} from "./role.service";
import {RoleInput} from "./role.input";
import {RoleUpdate} from "./role.update";
import {AssociationOutput} from "../associations/associationInput";
@ApiTags('roles')
@Controller('roles')
export class RoleController {

    constructor(private service: RoleService) {
    }

    @ApiOkResponse({
        description: 'succeful get all role',
        type: [Role]
    })
    @ApiOperation({ description: 'Get all role' })
    @Get()
    async getAll():Promise<Role[]>{
        return await this.service.getAll();
    }

    @ApiOkResponse({
        description: 'succeful get the role for a user to an association',
        type: [Role]
    })
    @ApiOperation({ description: 'Get the role of a user in an association' })
    @Get(":idUser/:idAssociation")
    async getRole(@Param("idAssociation") idAsso:number, @Param("idUser") idUser :number):Promise<Role>{
        const role : Role =await this.service.getRole(+idAsso,+idUser);
        if(!role){
            throw new HttpException('role not found', 404);
        }
        return role;
    }

    @ApiOkResponse({
        description: 'succeful update the role',
        type: Boolean
    })
    @ApiOperation({ description: 'Update a role' })
    @Put(":idUser/:idAssociation")
    async updateRole(@Body() input:RoleUpdate,@Param("idAssociation") idAsso:number, @Param("idUser") idUser :number):Promise<boolean>{
        if(!input.name){
            throw new HttpException('missing parameters', 400);
        }
        const rep=await this.service.updateRole(+idAsso,+idUser,input.name);
        if(!rep){
            throw new HttpException('role not found', 404);
        }
        return rep;
    }

    @ApiOkResponse({
        description: 'succeful deleted a role',
        type: Boolean
    })
    @ApiOperation({ description: "Delete a role" })
    @Delete(":idUser/:idAssociation")
    async DeleteRole(@Param("idAssociation") idAsso:number, @Param("idUser") idUser :number):Promise<boolean>{
        const rep=await this.service.deleteRole(+idAsso,+idUser);
        if(!rep){
            throw new HttpException('role not found', 404);
        }
        return rep;
    }

    @ApiOkResponse({
        description: 'succeful create a role',
        type: Boolean
    })
    @ApiOperation({ description: 'Create a role' })
    @Post()
    async create(@Body() input:RoleInput):Promise<boolean>{
        if(!input.idAssociation || !input.idUser || !input.name){
            throw new HttpException('missing parameters', 400);
        }
        return await this.service.createRole(input.idAssociation,input.idUser,input.name);
    }
}
