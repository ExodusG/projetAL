import { Module } from '@nestjs/common';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import {UsersModule} from "../users/users.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Association} from "./association.entity";
import {UsersAssociationsService} from "../users/users-associations/users-associations.service";

@Module({
  controllers: [AssociationsController],
  providers: [AssociationsService, UsersAssociationsService],
  imports: [UsersModule, TypeOrmModule.forFeature([Association])],
  exports: [AssociationsService]
})
export class AssociationsModule {}
