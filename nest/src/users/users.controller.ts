import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {User} from "./user.entity";
import {UsersService} from "./users.service";
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {UsersAssociationsService} from "./users-associations/users-associations.service";
import {UserInput} from "./userInput";


@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService,
                private usersAssociationsService: UsersAssociationsService) {}

    @ApiOkResponse({
        description: 'succeful get all user',
        type: [UserInput]
    })
    @ApiBearerAuth()
    @ApiOperation({ description: 'Get all users' })
    @UseGuards(AuthGuard('jwt'))
    @Get('')
    async getAll(): Promise<User[]> {
        return await this.usersService.getUsers();
    }

    @ApiOkResponse({
        description: 'succeful get the user',
        type: UserInput
    })
    @ApiOperation({ description: 'Get user by id' })
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Get(':id')
    async getUserById(@Param('id') id:number): Promise<User> {
        const user: User = await this.usersService.getUserById(+id);
        if (!user) {
            throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    @ApiCreatedResponse({
        description: 'The user has been successfully updated.',
        type:Boolean
    })
    @ApiOperation({ description: 'update an user using is id' })
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Put(':id')
    updateUser(@Param('id') id:number, @Body() input:UserInput): boolean {
        if (!input.firstname || !input.lastname || !input.age) {
            throw new HttpException('missing parameters', 400);
        }
        if (!this.usersService.updateUser(+id, {
            id: +id,
            firstname: input.firstname,
            lastname: input.lastname,
            age: +input.age,
            password: input.password
        })) {
            throw new HttpException('user not found', 404);
        } return true;
    }

    @ApiOkResponse({
        description: 'The user has been successfully deleted.',
        type:Boolean
    })
    @ApiOperation({ description: 'delete an user using is id' })
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Delete(":id")
    deleteUser(@Param('id') id: number): boolean {
        if (!this.usersService.deleteUser(+id)) {
            throw new HttpException('user not found', 404);
        } return true;
    }

    @ApiCreatedResponse({description: 'The user has been successfully created.',
    type:Boolean
    })
    @ApiOperation({ description: 'create an user' })
    @Post()
    async create(@Body() input: UserInput): Promise<boolean> {
        if (!input.firstname || !input.lastname || !input.age) {
            throw new HttpException('missing parameters', 400);
        }
        return await this.usersService.createUser(input.firstname, input.lastname, +input.age, input.password);
    }
    @ApiOkResponse({
        description: 'successfuly get the user associations'
    })
    @ApiOperation({ description: 'Get user associations by id' })
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Get(":id/associations")
    async getUserAssociations(@Param('id') id:number): Promise<boolean> {
        return await this.usersAssociationsService.getUsersAssociations(+id);
    }


}
