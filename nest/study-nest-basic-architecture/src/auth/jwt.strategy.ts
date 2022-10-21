import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt'; // Passport의 jwt 전략을 사용할 것이기 때문에 passport-jwt 모듈을 가져온다.
import { User } from './user.entity';
import { UserRepository } from './user.repository';

// 이 모듈은 JWT Passport를 사용하기 위한 JWT passport strategy 모듈이다.

@Injectable() // 다른 곳에 주입해서 사용하기 위한 데코레이터
export class JwtStrategy extends PassportStrategy(Strategy) {
  // NestJS에서 Passport 라이브러리를 사용하기 위한 PassportStrategy() 메서드에 passport-jwt 전략인 Strategy 객체를 넣어 종속받는다.
  // 컨트롤러의 핸들러에 @UseGuards() 데코레이터에 AuthGuard()를 대입한 데코레이터를 추가해주면 해당 핸들러로 들어온 요청은 이 객체로 들어오게 된다.
  // 그리고 요청의 헤더에 있는 JWT Token을 아래 옵션으로 복호화 해서 해당 토큰의 Payload(도메인 정보)를 아래 validate() 메서드의 인자에 대입한다.
  constructor(private userRepository: UserRepository) {
    // 요청에 포함되어 있는 토큰을 복호화한 데이터가 DB에 존재하는 지 확인하기 위한 UserRepository 종속성 주입한다.
    super({
      secretOrKey: 'Secret1234', // 토큰 생성에 사용한 Secret과 동일한 값을 넣는다.
      // 아래 jwtFromRequest의 토큰을 복호화하는 데 사용할 Secret
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 요청의 헤더에 있는 Bearer token을 추출한다.
      // ! 그렇기 때문에 요청을 보낼 때 토큰을 Bearer Token으로 보내야 한다.
    });
  }

  async validate(payload): Promise<User> {
    const { username } = payload; // 위에서 받은 Payload를 구조분해 할당해서 username 추출

    const user: User = await this.userRepository.findOne({
      where: { username },
    }); // DB에 해당 username을 가진 데이터가 있는 지확인한다.

    if (!user) throw new UnauthorizedException(); // DB에 없다면 인증되지 않은 것이므로 401 Unauthorized 예외처리

    return user; // DB에 있다면 해당 레코드 객체 반환
    // 여기에서 반환한 값은 해당 요청에 붙어서 서비스로 들어가게 된다.
  }
}
