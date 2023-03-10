import { Injectable, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AniwhereAuthGuard } from 'aniwhere/common/auth/aniwhere.guard';
@Injectable()
@Resolver()
export class AuthResolver {
  @UseGuards(AniwhereAuthGuard)
  @Mutation(() => String, { name: 'signUp' })
  signUp(@Args('input') input: string): string {
    console.log('SignUp');
    console.log('SignUp');

    return input;
  }

  @Mutation(() => String)
  signIn(@Args('input') input: string): string {
    console.log('SignIn');

    return 'SignIn';
  }
}
