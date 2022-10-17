import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { UsersService } from '../users/users.service';

@Injectable()
export class CurrentUserMiddleWare implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(req: Request, res: Request, next: NextFunction) {
    const { userId } = req.session || {};
    if (userId) {
      const user = this.userService.findOne_(userId);
      //   @ts-ignore
      req.currentUser = user;
    }
    next();
  }
}
