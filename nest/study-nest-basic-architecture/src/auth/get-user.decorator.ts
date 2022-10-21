import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

// ? 요청 객체의 user 객체만 추출해서 반환하는 커스텀 데코레이터

export const GetUser = createParamDecorator(
  // createParamDecorator()는 @Param 데코레이터를 만들 수 있는 메서드이다.
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest(); // 요청 객체를 가져오는 메서드

    return req.user; // 요청의 user 객체만 추출해서 반환
  },
);
