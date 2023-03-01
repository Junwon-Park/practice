import EnvConfigModule from 'env/env.config.module';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import Distributor from 'src/domain/entities/Distributor';
import Film from 'src/domain/entities/Film';
import LiveFilmViewerLog from 'src/domain/entities/LiveFilmViewerLog';
import Payment from 'src/domain/entities/Payment';
import Ticketing from 'src/domain/entities/Ticketing';
import User from 'src/domain/entities/User';

@Module({
  imports: [
    TypegooseModule.forRootAsync({
      imports: [EnvConfigModule],
      connectionName: process.env.MONGODB_CONNECTIONNAME,
      useFactory: async () => ({
        uri: process.env.MONGODB_HOST,
      }),
    }),
  ],
})
export default class MongodbModule {}

export const MongodbModels = [
  TypegooseModule.forFeature(
    [Distributor, Film, LiveFilmViewerLog, Payment, Ticketing, User],
    process.env.MONGODB_CONNECTIONNAME,
  ),
];
