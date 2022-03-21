import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  create(email: string, password: string) {
    const user = this.userRepo.create({ email, password });
    return this.userRepo.save(user);
  }

  getAllUsers() {
    return this.userRepo.find();
  }

  findWithEmail(email: string) {
    return this.userRepo.find({ email: email });
  }
  find_(id: number) {
    return this.userRepo.find({ id: id });
  }
  async findOne_(id: number) {
    if (!id) {
      return null;
    }
    return await this.userRepo.findOne(id);
  }

  async update(id: number, data: Partial<UserEntity>) {
    const user = await this.userRepo.findOne({ id });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(user, data);
    return await this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({ id });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return this.userRepo.remove(user);
  }
}
