import { FilmsController } from '../../interface/rest-api/controller/films.controller';
import { GraphqlConfigModule } from './../../interface/graphql/graphqlConfig.module';
import { Module } from '@nestjs/common';
import { FilmsService } from '../../application/service/films.service';

@Module({
  imports: [GraphqlConfigModule],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
