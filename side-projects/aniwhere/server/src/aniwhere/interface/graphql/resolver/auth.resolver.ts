import { Injectable } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
@Injectable()
@Resolver()
export class AuthResolver {
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
