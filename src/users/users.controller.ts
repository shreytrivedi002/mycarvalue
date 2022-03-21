import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SerialiseInterceptImport } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersDto } from './dto/users.dto';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('auth')
@SerialiseInterceptImport(UsersDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body.email, body.password);
  }

  @Get('allUsers')
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/signup/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Patch('/signup/:id')
  update(@Param('id') id: string, @Body() body: Partial<UserEntity>) {
    console.log(body);

    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/signup/:id')
  destroy(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Post('/signin')
  AuthenticateUser(@Body() body: CreateUserDto) {
    return this.authService.signin(body.email, body.password);
  }
}
