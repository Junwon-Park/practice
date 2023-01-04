import EnvConfigModule from 'env/env.module';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

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
  TypegooseModule.forFeature([], process.env.MONGODB_CONNECTIONNAME),
];
