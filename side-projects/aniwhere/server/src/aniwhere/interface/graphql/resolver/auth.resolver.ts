import { Injectable, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AniwhereAuthGuard } from 'aniwhere/common/auth/aniwhere.guard';

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
  logIn(@Args('input') input: string): string {
    console.log('LogIn success!');

    return input;
  }
}
