import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class UsersDto {
  @Expose()
  @IsString()
  id: number;

  @Expose()
  @IsEmail()
  email: string;
}
