import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  // createParamDecorator()는 @Param 데코레이터를 만들 수 있는 메서드이다.
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();

    return req.user;
  },
);
