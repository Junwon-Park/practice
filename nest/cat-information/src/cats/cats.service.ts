import { CatRequestDto } from './dto/cats.request.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {} // @InjectModel() 데코레이터를 사용해서 모델 자체를 클래스에 의존성 주입하여 사용할 수 있다.

  async singUp(body: CatRequestDto) {
    const { email, name, password } = body;

    const isCatExist = await this.catModel.exists({ email });

    if (isCatExist) {
      throw new HttpException('동일한 고양이가 이미 존재합니다.', 409);
    }

    const cat = await this.catModel.create({
      email,
      name,
      password,
    });

    return cat.readOnlyData; // Cat 스키마에 정의한 가상 필드인 readOnlyData 필드(password 필드를 포함하지 않은 객체)
  }
}
