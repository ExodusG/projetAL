import { Injectable } from '@nestjs/common';
import {Association} from "./association.entity";
import {User} from "../users/user.entity";
import {UsersService} from "../users/users.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class AssociationsService {

    constructor(@InjectRepository(Association) private repository: Repository<Association>, private userService: UsersService) {}

    async getAssociations(): Promise<Association[]> {
        return await this.repository.find();
    }

    async getAssociationById(id: number) : Promise<Association> {
        return await this.repository.findOneBy({id: id});
    }

    async updateAssociation(id: number, idUsers : number[], name:string): Promise<boolean> {
        const association: Association = await this.getAssociationById(id);
        if (!association) {
            return false;
        }
        if (name) {
            association.name = name;
        }
        if (idUsers) {

            let users : User[]=[]
            for(var val of idUsers){
                let user: User=await this.userService.getUserById(val);
                users.push(user)
            }

            association.users = users;
        }
        const result= await this.repository.save(association);

        return true;
    }

    async deleteAssociation(id: number): Promise<boolean> {
        const association:Association =await this.getAssociationById(id);
        if (!association) {
            return false;
        }
        await this.repository.remove(association);
        return true;

    }

    async createAssociation(name: string, idUser: number[]): Promise<boolean> {
        let users : User[]=[]
        for(var val of idUser){
            let user: User=await this.userService.getUserById(val);
            users.push(user)
        }

        await this.repository.save({
            name: name,
            users: users
        });
        return true;
    }

    async removeUserFromAssociation(idAssociation: number, idUser: number): Promise<boolean> {
        const association: Association = await this.getAssociationById(idAssociation);
        const localResult =association.users.splice(association.users.indexOf(await this.userService.getUserById(idUser)), 1);
        if (localResult.length === 0) {
            return false;
        }

        await this.repository.save(association);
        return true;
    }

    async addUserToAssociation(idAssociation: number, idUsers: number): Promise<boolean> {
        const association: Association = await this.getAssociationById(idAssociation);
        if (!association) {
            return false;
        }
        association.users.push(await this.userService.getUserById(idUsers));
        await this.repository.save(association);
    }

    async getMembers(idAssociation: number): Promise<User[]> {
        const association: Association = await this.repository.findOne({where: {id: idAssociation}, relations: ["users"], select: ["users"]});
        return association.users;
    }

}
