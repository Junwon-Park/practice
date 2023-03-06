import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class DistributorsResolver {
  @Mutation(() => String)
  signUp(@Args('input') input: string): string {
    console.log('SignUp');

    return 'SignUp';
  }

  @Mutation(() => String)
  signIn(@Args('input') input: string): string {
    console.log('SignIn');

    return 'SignIn';
  }
}
