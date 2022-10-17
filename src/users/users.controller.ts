import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  Session,
  UseGuards,
  // UseInterceptors,
} from '@nestjs/common';
// import { request } from 'http';
import { AuthGuard } from '../Auth.guard';
// import { CurrentUserInterceptor } from '../interceptors/current-user.interceptor';
import { SerialiseInterceptImport } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersDto } from './dto/users.dto';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('auth')
@SerialiseInterceptImport(UsersDto)
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/allUsers')
  @UseGuards(AuthGuard)
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Get('/signup/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne_(parseInt(id));
  }

  @UseGuards(AuthGuard)
  @Patch('/signup/:id')
  update(@Param('id') id: string, @Body() body: Partial<UserEntity>) {
    return this.usersService.update(parseInt(id), body);
  }

  @UseGuards(AuthGuard)
  @Delete('/signup/:id')
  destroy(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Post('/signin')
  async AuthenticateUser(@Body() body: CreateUserDto, @Session() session: any) {
    const [user] = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/cuser')
  async currentUser(@Request() request: any) {
    return request.currentUser;
  }

  @UseGuards(AuthGuard)
  @Get('/signout')
  async signout(@Session() session: any) {
    return (session.userId = null);
  }
}
