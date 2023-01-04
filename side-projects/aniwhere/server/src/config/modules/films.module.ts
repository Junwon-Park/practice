import { FilmsController } from '../../interface/rest-api/controller/films.controller';
import { GraphqlConfigModule } from './../../interface/graphql/graphqlConfig.module';
import { Module } from '@nestjs/common';
import { FilmsService } from '../../application/service/films.service';
import { MongodbModels } from 'src/infrastructure/mongodb/mongodb.module';

@Module({
  imports: [...MongodbModels, GraphqlConfigModule],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
