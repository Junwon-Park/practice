import { Injectable, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import AniwhereAuthService from 'aniwhere/common/auth/aniwhere.auth.service';
import { IAuthFields } from 'aniwhere/common/auth/aniwhere.auth.types';
import {
  AniwhereAuthGuard,
  CurrentUser,
} from 'aniwhere/common/auth/aniwhere.guard';
import RefreshToken from 'aniwhere/domain/entities/RefreshToken';
import RefreshTokenRepository from 'aniwhere/infrastructure/mongodb/repository/refreshToken.repository';

@Injectable()
@Resolver()
export class AuthResolver {
  constructor(
    private readonly aniwhereAuthService: AniwhereAuthService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}
  @Mutation(() => String, { name: 'signUp' })
  signUp(@Args('input') input: string): string {
    console.log('Signup success!');

    return input;
  }

  @UseGuards(AniwhereAuthGuard)
  @Mutation(() => String)
  async logIn(
    @CurrentUser() user: IAuthFields, // * 데코레이터의 필드, 타입 체크 못함 -> 인터페이스의 필드는 잡아올 수 있다(자동완성 가능).
    @Args('input') input: string,
  ): Promise<RefreshToken> {
    return await this.refreshTokenRepository.test(input);
  }
}
