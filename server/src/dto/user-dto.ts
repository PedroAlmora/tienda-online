import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    rol: string;
}
