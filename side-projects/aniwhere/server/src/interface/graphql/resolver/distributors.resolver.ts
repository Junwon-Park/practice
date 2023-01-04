import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class DistributorsResolver {
  @Query(() => String)
  sayHello(): string {
    console.log('Distributors');

    return 'Hello Distributors!';
  }
}
