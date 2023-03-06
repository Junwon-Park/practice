import { Index, modelOptions, Prop } from '@typegoose/typegoose';
import { ObjectId, ObjectIdToString } from 'src/common/types/mongodb';
import Distributor from './Distributor';
import Film from './Film';
import User from './User';

@modelOptions({
  schemaOptions: {
    collection: 'live-film-viewer-log',
    versionKey: false,
    id: true,
  },
})
@Index({ id: 1 })
@Index({ audienceId: 1 })
@Index({ distributorId: 1 })
@Index({ liveFilmId: 1 })
export default class LiveFilmViewerLog {
  @Prop({
    type: ObjectId,
    default: () => ObjectId(),
    get: ObjectIdToString,
  })
  _id!: string;
  id!: string;

  @Prop({ type: ObjectId, required: true, get: ObjectIdToString })
  audienceId!: string;

  @Prop({
    ref: 'User',
    foreignField: '_id',
    localField: 'audienceId',
    justOne: true,
  })
  user!: User;

  @Prop({ type: ObjectId, required: true, get: ObjectIdToString })
  distributorId!: string;
  @Prop({
    ref: 'Distributor',
    foreignField: '_id',
    localField: 'distributorId',
    justOne: true,
  })
  Distributor!: Distributor;

  @Prop({ type: ObjectId, required: true, get: ObjectIdToString })
  liveFilmId!: string;

  @Prop({
    ref: 'Film',
    foreignField: '_id',
    localField: 'liveFilmId',
    justOne: true,
  })
  film!: Film;

  @Prop({
    type: Date,
    required: true,
    default: Date.now,
  })
  entranceTime!: Date;

  @Prop({
    type: Date,
    required: false,
    default: Date.now,
  })
  exitTime?: Date;

  @Prop({
    type: Date,
    required: true,
    default: Date.now,
  })
  createdAt!: Date;
}
