import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import { UsersAssociationsService } from './users-associations/users-associations.service';
import {Association} from "../associations/association.entity";

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersAssociationsService],
  exports: [UsersService],
  imports: [
      TypeOrmModule.forFeature([User, Association])
  ]
})
export class UsersModule {}
