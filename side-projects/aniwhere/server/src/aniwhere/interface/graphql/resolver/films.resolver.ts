import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class FilmsResolver {
  @Query(() => String)
  sayHello2(): string {
    console.log('Films');
    return 'Hello Films!';
  }
}
