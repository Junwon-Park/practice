import { FilmsResolver } from '../../interface/resolver/films.resolver';
import { Module } from '@nestjs/common';
import { FilmsController } from '../../interface/controller/films.controller';
import { FilmsService } from '../../application/service/films.service';

@Module({
  controllers: [FilmsController],
  providers: [FilmsService, FilmsResolver],
})
export class FilmsModule {}
