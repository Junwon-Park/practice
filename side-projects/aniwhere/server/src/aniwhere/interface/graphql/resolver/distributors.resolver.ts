import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class DistributorsResolver {
  @Query(() => String)
  sayHello(): string {
    console.log('Distributors');
    console.log('Hello ?? Distributors@@@@@@@@@@@@@@@@@@@@@@@@@');

    return 'No Hello!! Distributors!';
  }
}
