import { Module } from '@nestjs/common';
import { MongodbModels } from 'aniwhere/infrastructure/mongodb/mongodb.module';
import FilmsService from 'aniwhere/application/service/films.service';
import FilmsController from 'aniwhere/interface/rest-api/controller/films.controller';

@Module({
  imports: [...MongodbModels],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
