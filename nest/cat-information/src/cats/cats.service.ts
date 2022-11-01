import { CatsRepository } from './cats.repository';
import { CatRequestDto } from './dto/cats.request.dto';
import { Injectable, ConflictException } from '@nestjs/common';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {} // @InjectModel() 데코레이터를 사용해서 모델 자체를 클래스에 의존성 주입하여 사용할 수 있다.
  // @InjectModel() 데코레이터에 Entity.name을 넣으면 Model<Entity>을 반환한다. 즉, catModel === Model<Cat>

  async singUp(body: CatRequestDto) {
    const { email } = body;

    const isExist = await this.catsRepository.existByEmail(email);

    if (isExist) throw new ConflictException('이미 존재하는 고양이입니다.');
    else return (await this.catsRepository.createCat(body)).readOnlyData; // Virtual field 응답 반환
  }
}
