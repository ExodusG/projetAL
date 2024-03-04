import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Association} from "../associations/association.entity";
import {DeleteResult, Repository} from "typeorm";
import {Role} from "./role.entity";
import {UsersService} from "../users/users.service";
import {AssociationsService} from "../associations/associations.service";
import {User} from "../users/user.entity";

@Injectable()
export class RoleService {
    constructor(@InjectRepository(Role) private repository: Repository<Role>, private userService: UsersService, private assoService: AssociationsService) {

    }

    async getAll(): Promise<Role[]>{
        return (await this.repository.find());
    }
    async getRole(idAsso : number, idUser :number){
        const user :User =await this.userService.getUserById(idUser);
        const association:Association =await this.assoService.getAssociationById(idAsso);
        const role : Role=await this.repository.findOne({
            where: {
                association:association,
                user:user
            }
        })
        return role;
    }


    async createRole(idAsso :number, idUser :number, name:string){
        const user :User =await this.userService.getUserById(idUser);
        const association:Association =await this.assoService.getAssociationById(idAsso);
        if(user && association){
            let role:Role=new Role(association,user,name);
            await this.repository.save(role);
            return true;
        }
        return false;
    }

    async deleteRole(idAsso :number, idUser :number){
        const user :User =await this.userService.getUserById(idUser);
        const association:Association =await this.assoService.getAssociationById(idAsso);
        if(user && association){
            const result: DeleteResult= await this.repository.delete({association:association,user:user})
            return result.affected > 0;
        }
       return false;
    }
    async updateRole(idAsso :number, idUser :number, name:string){
        const user :User =await this.userService.getUserById(idUser);
        const association:Association =await this.assoService.getAssociationById(idAsso);
        if(user && association){
            const role : Role=await this.repository.findOne({
                where: {
                    association:association,
                    user:user
                }
            })
            role.name=name;
            await this.repository.save(role);
            return true;
        }
        return false;
    }
}
