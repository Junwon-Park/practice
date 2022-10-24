import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
// @nestjs/passport라이브러리는 NestJS에서 Passport를 사용할 수 있도록 등록하거나 상속, 설정 등록 등 NestJS에서 사용할 수 있도록 해주는 모듈을 제공하며 imports에 등록해야 한다.
// passport 라이브러리는 실제 Passport의 기능을 하는 모듈을 제공하는 라이브러리이다.
import { JwtModule } from '@nestjs/jwt';
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
      // register() 메서드는 적용할 옵션을 설정할 떄 사용하는 메서드이다.
      // JWT와 Passport는 Auth 모듈에만 필요하기 때문에 app.module.ts가 아닌 auth.module.ts의 imports에 등록한다.
      // 토큰 생성을 위한 옵션도 함께 설정한다.
      secret: 'Secret1234',
      signOptions: {
        expiresIn: 3600, // 1h
      },
    }),
    PassportModule.register({
      // 이 모듈에 Passport 사용을 위한 등록
      // register() 메서드는 적용할 옵션을 설정할 떄 사용하는 메서드이다.
      defaultStrategy: 'jwt', // 이 Passport의 기본 전략을 JWT passport로 등록
    }),
  ],
  controllers: [AuthController], // controllers 속성에 등록하면 이 모듈(auth)에 컨트롤러로 등록할 수 있다.
  providers: [AuthService, UserRepository, JwtStrategy],
  // proviers 속성에 등록하면 이 모듈(auth 모듈) 내에서 사용할 수 있다.
  // 왜냐하면 프로바이더에 등록된 모듈은 기본적으로 캠슐화(모듈 레벨에서의 캡슐화(이 모듈 내에서만 사용 가능)) 되기 때문에 모듈 내에서 프로바이더에 등록되었다고 해서 외부 모듈에서 프로바이더를 사용할 수 없다.
  // 외부 모듈에서 프로바이더를 사용하려면 사용하고자 하는 프로바이더를 exports에 등록해서 외부에 내보내야 한다.
  exports: [JwtStrategy, PassportModule], // exports 속성에 등록하면 다른 모듈에서도 import 해서 사용할 수 있다.
  // 인증된 유저만 게시물을 요청할 수 있도록 하는 부분에서 Passport를 사용하기 위해 Boards 모듈에서 JwtStrategy(Boards 모듈에서도 이 전략 사용)와 PassportModule(Boards 모듈에서도 PassportModule를 사용)
  // exports에 등록한 모듈은 외부 모듈에서 imports에 AuthModule을 등록하면 사용할 수 있다.
})
export class AuthModule {}
