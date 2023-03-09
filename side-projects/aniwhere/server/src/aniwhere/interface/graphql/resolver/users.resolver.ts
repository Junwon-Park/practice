import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UsersResolver {
  @Query(() => String)
  sayHello4(): string {
    console.log('Users');
    return 'Hello Users!';
  }
}
