import {Injectable} from '@nestjs/common';
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Equal, Repository} from "typeorm";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>
    ) {
    }

    getUsers() : Promise<User[]> {
        return this.repository.find();
    }

    async getUserById(id: number) : Promise<User> {
        return await this.repository.findOne({where: {id: Equal(id)}});
    }

    async updateUser(id: number, newUser: User) {
        const user: User = await this.getUserById(id);
        if (!user) {
            return false;
        }
        if (newUser.firstname) {
            user.firstname = newUser.firstname;
        }
        if (newUser.lastname) {
            user.lastname = newUser.lastname;
        }
        if (newUser.age) {
            user.age = newUser.age;
        }
        if (newUser.password) {
            const saltRounds = 10;
            user.password = await bcrypt.hash(newUser.password, saltRounds);
        }
        const result = await this.repository.update({id: user.id}, user);
        return result.affected > 0;
    }

    async deleteUser(id: number) {
        const result: DeleteResult = await this.repository.delete({id: id});
        return result.affected > 0;
    }

    async createUser(firstName: string, lastName: string, age: number, password: string): Promise<boolean> {
        const saltRounds = 10;
        await this.repository.save({
            firstname: firstName,
            lastname: lastName,
            age: age,
            password: await bcrypt.hash(password, saltRounds)
        });
        return true;
    }
}
