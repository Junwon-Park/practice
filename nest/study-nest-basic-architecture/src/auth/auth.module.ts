import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    // imports 속성에 등록하면 외부에서 불러온 라이브러리와 모듈을 이 모듈(auth)에서 사용할 수 있다.
    TypeOrmModule.forFeature([User]), // User entity TypeORM 모듈 등록
    JwtModule.register({
      // 이 모듈에 JWT 사용을 위한 등록
      // JWT와 Passport는 Auth 모듈에만 필요하기 때문에 app.module.ts가 아닌 auth.module.ts의 imports에 등록한다.
      // 토큰 생성을 위한 옵션도 함께 설정한다.
      secret: 'Secret1234',
      signOptions: {
        expiresIn: 3600, // 1h
      },
    }),
    PassportModule.register({
      // 이 모듈에 Passport 사용을 위한 등록
      defaultStrategy: 'jwt', // 이 Passport의 기본 전략을 JWT passport로 등록
    }),
  ],
  controllers: [AuthController], // controllers 속성에 등록하면 이 모듈(auth)에 컨트롤러로 등록할 수 있다.
  providers: [AuthService, UserRepository, JwtStrategy], // proviers 속성에 등록하면 이 모듈(auth 모듈) 내에서 사용할 수 있다.
  exports: [JwtStrategy, PassportModule], // exports 속성에 등록하면 다른 모듈에서도 import 해서 사용할 수 있다.
})
export class AuthModule {}
