import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';

// export function CurrentUserInterceptImport(dto: any) {
//   return UseInterceptors(new CurrentUserInterceptor(dto));
// }
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    // code inside here is run before incomming request is handled

    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;
    if (userId) {
      const user = await this.usersService?.findOne_(userId);
      request.currentUser = user;
    }
    return next.handle();
  }
}
