import { ObjectId } from 'global/types/mongodb';

// * 인터페이스의 필드는 기본 Required이며, ?로 옵셔널 필드로 설정할 수 있다.
export interface IAuthFields {
  id: ObjectId;
  loginId: string;
  name: string;
  nickName: string;
  phone: string;
  address: string;
}

export interface IGenerateTokenFields {
  loginId: string;
}
