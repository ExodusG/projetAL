import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AssociationsModule } from './associations/associations.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users/user.entity";
import {Association} from "./associations/association.entity";
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import {Role} from "./role/role.entity";
import { EventsModule } from './events/events.module';
import {PrometheusModule} from "@willsoto/nestjs-prometheus";

@Module({
  imports: [UsersModule, AssociationsModule,
   PrometheusModule.register(),
   TypeOrmModule.forRoot({
   type: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_BASE,
    synchronize: true,
    logging: true,
    entities: [User,Association,Role],
    subscribers: [],
    migrations: [],
  }), AuthModule, RoleModule, EventsModule]
})
export class AppModule {}
