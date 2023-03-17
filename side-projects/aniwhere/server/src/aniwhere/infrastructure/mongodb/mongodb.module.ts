import EnvConfigModule from 'config/env.config.module';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import Distributor from 'aniwhere/domain/entities/Distributor';
import Film from 'aniwhere/domain/entities/Film';
import LiveFilmViewerLog from 'aniwhere/domain/entities/LiveFilmViewerLog';
import Payment from 'aniwhere/domain/entities/Payment';
import Ticketing from 'aniwhere/domain/entities/Ticketing';
import User from 'aniwhere/domain/entities/User';
import RefreshToken from 'aniwhere/domain/entities/RefreshToken';

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
    [
      Distributor,
      Film,
      LiveFilmViewerLog,
      Payment,
      Ticketing,
      User,
      RefreshToken,
    ],
    process.env.MONGODB_CONNECTIONNAME,
  ),
];
