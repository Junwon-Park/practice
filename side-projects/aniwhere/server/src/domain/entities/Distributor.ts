import { Index, modelOptions, Prop } from '@typegoose/typegoose';
import { ObjectId, ObjectIdToString } from 'common/types/mongodb';
import User from 'domain/entities/User';

@modelOptions({
  schemaOptions: {
    collection: 'distributor',
    versionKey: false,
    id: true,
  },
})
@Index({ id: 1 })
@Index({ directorId: 1 })
@Index({ name: 1 })
export default class Distributor {
  @Prop({
    type: ObjectId,
    default: () => ObjectId(),
    get: ObjectIdToString,
  })
  _id!: string;
  id!: string;

  @Prop({ type: ObjectId, required: true, get: ObjectIdToString })
  directorId!: string;

  @Prop({
    ref: 'User',
    foreignField: '_id',
    localField: 'directorId',
    justOne: true,
  })
  user!: User;

  @Prop({
    type: String,
    required: true,
  })
  name!: string;

  @Prop({
    type: String,
    required: true,
  })
  logo!: string;

  @Prop({
    type: Boolean,
    required: true,
  })
  isActive!: boolean;

  @Prop({
    type: Date,
    required: true,
    default: Date.now,
  })
  createdAt!: Date;

  @Prop({
    type: Date,
    required: true,
    default: Date.now,
  })
  updatedAt!: Date;
}
