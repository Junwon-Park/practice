import { Injectable, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IAuthFields } from 'aniwhere/common/auth/aniwhere.auth.types';
import {
  AniwhereAuthGuard,
  CurrentUser,
} from 'aniwhere/common/auth/aniwhere.guard';

@Injectable()
@Resolver()
export class AuthResolver {
  @Mutation(() => String, { name: 'signUp' })
  signUp(@Args('input') input: string): string {
    console.log('Signup success!');

    return input;
  }

  @UseGuards(AniwhereAuthGuard)
  @Mutation(() => String)
  logIn(
    @CurrentUser() user: IAuthFields, // * 데코레이터의 필드, 타입 체크 못함 -> 인터페이스의 필드는 잡아올 수 있다(자동완성 가능).
    @Args('input') input: string,
  ): string {
    console.log('LogIn success!');
    console.log(user);

    return input;
  }
}
