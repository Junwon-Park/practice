import { FilmsController } from 'aniwhere/interface/rest-api/controller/films.controller';
import { Module } from '@nestjs/common';
import { FilmsService } from 'aniwhere/application/service/films.service';
import { MongodbModels } from 'aniwhere/infrastructure/mongodb/mongodb.module';

@Module({
  imports: [...MongodbModels],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
