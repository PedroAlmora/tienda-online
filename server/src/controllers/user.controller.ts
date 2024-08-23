import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/services';
import { CreateUserDto, UpdateUserDto, UserDto } from 'src/dto';
import { User } from 'src/entitys';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/middlewares';

@ApiTags('USER')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Obtener usuarios',
    description: 'Este endpoint devuelve todos los usuarios',
  })
  @ApiOkResponse({
    description: 'Usuarios obtenidos exitosamente',
    type: [UserDto],
  })
  @ApiResponse({
    status: 400,
    description: 'No encontrado',
  })
  async allUser(): Promise<UserDto[]> {
    return await this.userService.findAllUser();
  }

  @ApiOperation({
    summary: 'Obtener usuario',
    description: 'Este endpoint devuelve un usuario',
  })
  @ApiOkResponse({
    description: 'Usuario obtenido exitosamente',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'No encontrado',
  })
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    const userId = parseInt(id, 10);
    return await this.userService.findByIdUser(userId);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<User> {
    const userId = parseInt(id, 10);
    return await this.userService.updateUser(userId, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    const userId = parseInt(id, 10);
    return await this.userService.deleteUser(userId);
  }
}
