import { ObjectId } from 'aniwhere/common/types/mongodb';
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
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }

  handleRequest(err: any, signatureArg: any) {
    if (err || !signatureArg) {
      throw err || new UnauthorizedException();
    }

    return signatureArg;
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
