import {Controller, Get, Inject, Param} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {ClientProxy} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";
import {User} from "../users/user.entity";
import {AssociationsService} from "../associations/associations.service";

@Controller('events')
@ApiTags('events')
export class EventsController {
    constructor(@Inject('EVENT_NOTIF_SERVICE') private client: ClientProxy, private assoService : AssociationsService) {
    }
    @Get("")
    async getAll(): Promise<Boolean> {
        console.log("Sending message");
        const pattern = { cmd: 'msg'};
        const payload = 'coucou je suis un payload heheo';
        this.client.emit(pattern, payload);
        //this.client.send(pattern, payload);
        return true;
    }

    @Get(':id')
    async sendNotification(@Param('id') id:number):Promise<Boolean>{
        //let mail=[];
        const users:User[]=await this.assoService.getMembers(+id);
        console.log(users);
        const pattern = { cmd: 'msg'};
        for(let user of users){
            //mail.push(user.firstname+"."+user.lastname+"@gmail.com");
            console.log('send');
            this.client.emit(pattern,user.firstname+"."+user.lastname+"@gmail.com");
        }
        //console.log(mail);
        //this.client.emit(pattern,mail.toString());
        return true;
    }
}