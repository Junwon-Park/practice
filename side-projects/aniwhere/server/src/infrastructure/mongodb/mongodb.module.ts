import EnvConfigModule from 'config/env.config.module';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import Distributor from 'domain/entities/Distributor';
import Film from 'domain/entities/Film';
import LiveFilmViewerLog from 'domain/entities/LiveFilmViewerLog';
import Payment from 'domain/entities/Payment';
import Ticketing from 'domain/entities/Ticketing';
import User from 'domain/entities/User';

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
