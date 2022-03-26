import { HttpException, HttpStatus, Injectable, Session } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const user = await this.userService.findWithEmail(email);
    if (user.length) {
      throw new HttpException('email already present', HttpStatus.CONFLICT);
    }
    // password hashing
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return await this.userService.create(
      email,
      salt + '.' + hash.toString('hex'),
    );
  }

  async signin(email: string, password: string) {
    const user = await this.userService.findWithEmail(email);
    if (!user.length) {
      throw new HttpException(
        'user not found with this email!!!',
        HttpStatus.FORBIDDEN,
      );
    }
    const saltPassword = user[0].password;
    const salt = saltPassword.split('.')[0];
    const encPassword = saltPassword.split('.')[1];
    const result = (await scrypt(password, salt, 32)) as Buffer;
    if (result.toString('hex') != encPassword) {
      throw new HttpException('Invalid Password!!', HttpStatus.FORBIDDEN);
    }
    return user;
  }
}
