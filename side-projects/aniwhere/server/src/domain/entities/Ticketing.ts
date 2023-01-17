import { Index, modelOptions, Prop } from '@typegoose/typegoose';
import { ObjectId, ObjectIdToString } from 'src/common/types/mongodb';
import Film from './Film';
import User from './User';

@modelOptions({
  schemaOptions: {
    collection: 'ticketing',
    versionKey: false,
  },
})
@Index({ id: 1 })
@Index({ filmId: 1 })
@Index({ audienceId: 1 })
export default class Ticketing {
  @Prop({
    type: ObjectId,
    alias: 'id',
    default: () => ObjectId(),
    get: ObjectIdToString,
  })
  _id!: string;
  id!: string;

  @Prop({ type: ObjectId, required: true, get: ObjectIdToString })
  filmId!: string;

  @Prop({
    ref: 'Film',
    foreignField: '_id',
    localField: 'filmId',
    justOne: true,
  })
  film!: Film;

  @Prop({ type: ObjectId, required: true, get: ObjectIdToString })
  audienceId!: string;

  @Prop({
    ref: 'User',
    foreignField: '_id',
    localField: 'audienceId',
    justOne: true,
  })
  user!: User;

  @Prop({
    type: Date,
    required: true,
    default: Date.now,
  })
  createdAt!: Date;
}
