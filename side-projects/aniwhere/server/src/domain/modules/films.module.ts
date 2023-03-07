import { FilmsController } from 'interface/rest-api/controller/films.controller';
import { Module } from '@nestjs/common';
import { FilmsService } from 'application/service/films.service';
import { MongodbModels } from 'infrastructure/mongodb/mongodb.module';

@Module({
  imports: [...MongodbModels],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
