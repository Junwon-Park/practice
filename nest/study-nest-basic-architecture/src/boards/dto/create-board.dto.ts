import { IsNotEmpty } from 'class-validator';
// DTO(Data Transfer Object)
// DTO는 계층간 데이터 교환을 위한 객체이다.
// Interface 또는 Class를 사용해서 정의할 수 있지만 NestJS에서는 Class를 사용하는 것을 권장하고 있다.
// DTO를 사용하는 이유는 데이터 유효성을 체크하는데 효율적이며, 더 안정적인 코드를 만들어준다. 타입스크립트의 타입으로도 사용된다.
export class CreateBoarDto {
  // 이 클래스는 게시물을 생성하는데 사용되는 필드와 타입을 정의한 DTO이다.
  // Controller와 Service에서 사용된다.
  // ! 예를 들어, 요청의 Body에 수많은 필드의 데이터가 들어오고 그 필드들을 여러 컨트롤러 또는 서비스에서 사용한다면 에러가 발생할 가능성이 높아 불안정하고 유지보수성도 떨어지게 되며 하나의 필드를 수정하면 그 필드를 사용하는 모든 곳을 찾아 수정해주어야 한다.
  // 이 때, DTO를 생성하여 이 것을 재사용 한다면 이런 부분들을 보완할 수 있기 때문에 DTO를 사용한다.
  @IsNotEmpty()
  // 이런식으로 수행하고자 하는 유효성 검사를 지정해 놓고 이 DTO를 사용하는 부분(Handler level, Parameter level, Global level)에 ValidationPipe를 등록하면 해당 유효성 검사를 수행한 뒤 검사를 모두 통과하면 값을 넘겨주고 통과하지 못하면 에러를 발생시킨다.
  // title이라는 속성에 값이 없는지 검사하는 유효성 검사 항목을 지정해 놓은 것이다.
  title: string;

  @IsNotEmpty()
  description: string;
}
