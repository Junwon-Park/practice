import { ObjectId } from 'global/types/mongodb';
import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AniwhereAuthGuard extends AuthGuard('aniwhere') {
  getRequest(context: ExecutionContext) {
    // 요청이 오면 UseGuard에서 getRequest() 메서드에 처음 들어온다.
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req; // 여기에서 반환한 요청 객체는 aniWhere strategy로 들어간다.
  }

  handleRequest(err: any, signatureArg: any) {
    // aniWhere strategy의 validate() 메서드에서 반환된 값이 handleRequest() 메서드의 두 번째 인자인 signatureArg로 들어온다.
    if (err || !signatureArg) {
      throw err || new UnauthorizedException();
    }
    return signatureArg; // 이 반환 값이 최종적으로 요청을 받은 Controller 또는 Resolver로 들어간다.
  }
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    return {
      ...ctx.getContext().req.user,
      id: ObjectId(ctx.getContext().req.user.id),
    };
  },
);
