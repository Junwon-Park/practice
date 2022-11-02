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
    // .forFeature() 메서드는 대상을 지정하는 메서드이다.
    JwtModule.register({
      // 이 모듈에 JWT 사용을 위한 등록
      // register() 메서드는 적용할 옵션을 설정할 떄 사용하는 메서드이다.
      // JWT와 Passport는 Auth 모듈에만 필요하기 때문에 app.module.ts가 아닌 auth.module.ts의 imports에 등록한다.
      // 토큰 생성을 위한 옵션도 함께 설정한다.
      // 토큰이 생성될 때 이 옵션이 사용된다.
      secret: 'Secret1234', // ! 처음 토큰 생성 시 사용될 Salt(JwtStrategy의 secret으로 복호화 하므로 두 값은 동일해야 한다.)
      signOptions: {
        expiresIn: 3600, // 1h
      },
    }),
    PassportModule.register({
      // 이 모듈에 Passport 사용을 위한 등록
      // register() 메서드는 적용할 옵션을 설정할 떄 사용하는 메서드이다.
      defaultStrategy: 'jwt', // 이 Passport의 기본 전략을 JWT passport로 등록
      // 기본 전략이 jwt이기 때문에 @nestjs/passport의 AuthGuard()의 인자로 전략을 지정하지 않아도 jwt 전략으로 동작한다.
    }),
  ],
  controllers: [AuthController], // controllers 속성에 등록하면 이 모듈(auth)에 컨트롤러로 등록할 수 있다.
  providers: [AuthService, UserRepository, JwtStrategy], // JwtStrategy를 providers에 등록해야 모듈 내에서 JwtService를 사용할 수 있다.
  // proviers 속성에 등록하면 이 모듈(auth 모듈) 내에서 사용할 수 있다.
  // ! 왜냐하면 프로바이더에 등록된 모듈은 기본적으로 캠슐화(모듈 레벨에서의 캡슐화(이 모듈 내에서만 사용 가능)) 되기 때문에 모듈 내에서 프로바이더에 등록되었다고 해서 외부 모듈에서 프로바이더를 사용할 수 없다.
  // 외부 모듈에서 프로바이더를 사용하려면 사용하고자 하는 프로바이더를 exports에 등록해서 외부에 내보내야 한다.
  exports: [JwtStrategy, PassportModule], // exports 속성에 등록하면 다른 모듈에서도 import 해서 사용할 수 있다.
  // ! NestJS에서 providers는 기본적으로 캡슐화(외부에서 접근 불가) 되어있기 때문에 외부 모듈에서 import 하려면 provider가 속한 모듈에서 export 해줘야 한다.
  // 그리고 나서 외부 모듈에서 해당 모듈을 imports에 등록하여 providers에 등록하면 해당 외부 모듈에서 이 모듈이 exports 하는 providers를 의존성 주입하여 사용할 수 있다.
  // 인증된 유저만 게시물을 요청할 수 있도록 하는 부분에서 Passport를 사용하기 위해 Boards 모듈에서 JwtStrategy(Boards 모듈에서도 이 전략을 사용한다.)와 PassportModule(Boards 모듈에서도 PassportModule을 사용한다.)
  // 이 모듈에서 exports에 등록한 모듈은 외부 모듈에서 imports에 이 모듈(AuthModule)을 등록하면 사용할 수 있다.
})
export class AuthModule {}
