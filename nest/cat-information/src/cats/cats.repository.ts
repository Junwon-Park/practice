import { CatRequestDto } from './dto/cats.request.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existByEmail(email: string): Promise<{ _id: string }> {
    try {
      return await this.catModel.exists({ email }); // exists({ Key: Value })의 반환 값은 Boolean 타입이 아니라 존재한다면 해당 Document의 _id, 존재하지 않는다면 null을 반환한다.
    } catch (error) {
      throw new HttpException('DB Error', 400); // 스키마 단에서 class-validator를 사용하여 유효성 검사 후 DB 단에서 문제가 생기는 부분에 에러를 발생시키기 때문에 이런 경우 이 부분은 사실 필요 없다.
      // 만약 스키마 단에서 유효성 검사를 하지 않는 경우 이렇게도 처리할 수 있다.
    }
  }

  async createCat(catsInfo: CatRequestDto): Promise<Cat> {
    const { email, name, password } = catsInfo;

    return this.catModel.create({ email, name, password });
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    return await this.catModel.findOne({ email });
  }
}
