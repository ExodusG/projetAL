import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import {RoleService} from "./role.service";
import {Role} from "./role.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import {AssociationsModule} from "src/associations/associations.module";

@Module({
    providers: [RoleService],
    controllers: [RoleController],
    imports: [TypeOrmModule.forFeature([Role]),UsersModule,AssociationsModule]


})
export class RoleModule {}
