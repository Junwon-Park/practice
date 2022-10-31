import { Cat, CatSchema } from './cats.schema';
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])], // 스키마 객체를 MongooseModule.forFeature()의 인자로 전달하여 해당 모듈의 imports에 등록한다.
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
