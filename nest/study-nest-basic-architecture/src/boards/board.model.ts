// model은 Interface 또는 Class로 생성하여 사용한다.
// Interface로 생성하는 경우는 변수의 타입만을 체크하는 경우이다.
// Class로 생성하는 경우는 변수의 타입을 체크하고 인스턴스도 생성하고자 하는 경우이다.

export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}

export enum BoardStatus { // enum은 enumeration의 약자이다.
  // BoardStatus라는 enum 타입에는 아래 속성의 값만 올 수 있다.
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVAGE',
}
