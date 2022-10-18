// ! Service는 컨트롤러에서 유효성 체크를 하거나 데이터베이스에 아이템을 생성하는 등의 작업을 처리한다.
import { Injectable } from '@nestjs/common';

@Injectable() // @Injectable() 데코레이터는 해당 NestJS 프로젝트 전체에서 이 서비스를 사용할 수 있게 해준다.
// ! 서비스는 여러 컨트롤러에서 사용될 수 있고 어떤 컨트롤러에도 종속성 주입이 가능해야 하기 때문에 프로젝트 전체에서 사용할 수 있어야 한다.
export class BoardsService {}
