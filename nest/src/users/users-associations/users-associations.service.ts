import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Association} from "../../associations/association.entity";

@Injectable()
export class UsersAssociationsService {
    constructor(
        @InjectRepository(Association) private associationRepository: Repository<Association>) {
    }

    async getUsersAssociations(id: number): Promise<any> {
        const resp = await this.associationRepository.createQueryBuilder("association");
        resp.leftJoin("association.users", "user");
        resp.where("user.id = :id",
            {id: id});
        return resp.getMany();
    }
}
