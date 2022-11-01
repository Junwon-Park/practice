import { AuthModule } from './../auth/auth.module';
import { CatsRepository } from './cats.repository';
import { Cat, CatSchema } from './cats.schema';
import { forwardRef, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]), // 스키마 객체를 MongooseModule.forFeature()의 인자로 전달하여 해당 모듈의 imports에 등록한다.
    forwardRef(() => AuthModule), // 현재 CatsService에서 고양이 정보를 인증하여 토큰을 얻기 위해 AuthModule을 참조하고 있고, AuthService에서도 토큰 생성 전 인증을 위해 CatsRepository를 참조하고 있다.
    // 이런 경우 서로를 참조하기 때문에 순환참조 문제가 발생할 수 있는데, 이 때 forwardRef()를 사용해서 순환참조 중인 모델을 imports에 등록하는 부분에서 감싸주면 해결할 수 있다.
    // 한 쪽만 감싸주는 것이 아니라 양 쪽 모두 감싸주어야 한다.
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
