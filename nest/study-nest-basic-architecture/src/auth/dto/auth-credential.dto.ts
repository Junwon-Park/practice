import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class AtuhCredentialDto {
  // AuthCredentialDto는 User라는 도메인의 데이터를 주고 받을 때, 인증에 필요한 데이터만을 주고받을 수 있는 데이터 전송 객체(DTO)이다.
  // 아렇게 DTO를 사용하면 통신에 필요한 속성만 노출하고 도메인의 모든 속성의 노출을 방지할 수 있다.
  // DTO는 통신에 필요한 도메인의 속성만을 제공하고 비즈니스 로직은 가지지 않는다.

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'Password only accepts english or number',
  })
  password: string;
}
