import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  Session,
} from '@nestjs/common';
import { SerialiseInterceptImport } from '../interceptors/serialize.interceptor';
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
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('allUsers')
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/signup/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne_(parseInt(id));
  }

  @Patch('/signup/:id')
  update(@Param('id') id: string, @Body() body: Partial<UserEntity>) {
    return this.usersService.update(parseInt(id), body);
  }

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

  @Get('/getRequestData')
  async getReqData(@Request() request: any) {
    // console.log(request.currentUser);

    return request;
  }
}
