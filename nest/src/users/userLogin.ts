import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class UserLogin {

    @ApiModelProperty({ example: '1', description: 'the username' })
    readonly username: string;

    @ApiModelProperty({
        example: 'mypassword',
        description: 'the password',
    })
    readonly password: string;
}
