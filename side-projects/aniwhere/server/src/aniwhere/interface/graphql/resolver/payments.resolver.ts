import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class PaymentsResolver {
  @Query(() => String)
  sayHello3(): string {
    console.log('Payments');
    return 'Hello Payments!';
  }
}
