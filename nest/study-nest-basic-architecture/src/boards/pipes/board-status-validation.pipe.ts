import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board.status.enum';
// 커스텀 파이프 구현
// NestJS에서 기본적으로 제공하는 빌트인 파이프 외에 커스텀 파이프를 직접 구현하여 사용할 수 있다.

export class BoardStatusValidationPipe implements PipeTransform {
  // 커스텀 파이프를 구현하려면 구현하려는 커스텀 파이프 클래스를 생성하고 NestJS 빌트인 인터페이스인 PipeTransform을 implements(구현)해야 한다.

  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];
  // readonly 접두사(prefix)는 속성을 읽기 전용으로 만들 때 사용되는데 읽기 전용 멤버는 클래스 외부에서 액세스할 수 있지만 해당 값을 수정할 수는 없다.
  // private 접두사와의 차이점은 private은 클래스 외부에서는 액세스하거나 수정하는 것이 불가능하고 클래스 외부에서는 아에 접근할 수 없다.

  //   transform(value: any, metadata: ArgumentMetadata) {
  transform(value: any) {
    // PipeTransform 인터페이스를 implements 하면 transform() 메서드를 구현할 수 있다.
    // 그리고 transform() 메서드는 any 타입의 value와 ArgumentMetadata 타입의 metadata라는 두 개의 파라미터를 가질 수 있다.(하나만 가질 수도 있다.)
    // BoardStatusValidationPipe 파이프는 요청의 Body에 들어오는 특정 필드에 대한 유효성 검사를 진행할 Parameter level의 파이프이다.
    // 이 때, transform() 메서드의 value 파라미터에 들어오는 값은 이 파이프가 사용될 곳에 들어오는 필드의 값이 들어오게 된다. 즉, 처리가 된 인자의 값
    // 그리고 metadata는 이 파이프가 검사한 부분의 메타데이터가 들어오는데, 여기에서는 요청의 Body에 들어오는 status라는 필드를 검사했으므로 type: 'body', data: 'status'라는 값이 들어온다. 즉, 처리된 인자에 대한 메타 데이터를 가진 객체

    value = value.toUpperCase();

    if (!this.isStatusValid(value))
      throw new BadRequestException(`${value} isn't in the status options`);

    return value; // transform() 메서드는 value를 반환한다.
    // transfrom() 메서드가 반환한 값은 Route handler로 전해진다.
  }

  private isStatusValid(status: any) {
    // 이 파이프에 들어온 status의 값이 this.StatusOptions의 두 값 중 하나인지 검증하는 메서드
    const index = this.StatusOptions.indexOf(status); // 이 파이프에 들어온 status의 값이 this.StatusOptions에 있는 두 값 중 존재한다면 해당 요소의 인덱스 반환 없다면 -1(Falsy) 반환

    return index !== -1; // -1이라면 False
  }
}
