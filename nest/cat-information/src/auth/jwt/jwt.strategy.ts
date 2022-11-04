import { CatsRepository } from './../../cats/cats.repository';
import { Payload } from './jwt.payload';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // 생성된 토큰은 이 클래스에서 복호화 및 인증한다.
  // 즉, @UseGuards()에 등록하는 AuthGuard()가 호출되면 이 모듈이 실행되는 것이다.
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, //  false라면 JWT가 만료되지 않았음을 보증하는 책임을 Passport 모듈에 위임함을 의미한다. 이것은 만약 만료된 JWT를 받았을 경우, request는 거부되고 401 Unauthorized response를 보낼 것이다.
      // true로 설정하면 이 검증을 passport에 위임하지 않는다는 의미이기 때문에 만료된 JWT를 받아도 에러가 발생하지 않고 request도 거부되지 않는다. 즉, JWT 검증을 직접 하려는 경우 true로 설정한다.
      // 여기에서는 passport가 JWT를 검증하도록 하기 위해 false로 설정한다.
      secretOrKey: 'secret', // ! AuthMdule의 JWT 모듈에 등록한 scret과 일치해야 토큰으로 요청이 왔을 떄, 해당 토큰을 인증할 수 있다.
    });
  }

  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );

    if (cat) return cat;
    else throw new UnauthorizedException();
  }
}
