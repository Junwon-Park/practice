import { Index, modelOptions, Prop } from '@typegoose/typegoose';
import { ObjectId, ObjectIdToString } from 'common/types/mongodb';
import Ticketing from 'domain/entities/Ticketing';

@modelOptions({
  schemaOptions: {
    collection: 'payment',
    versionKey: false,
    id: true,
  },
})
@Index({ id: 1 })
@Index({ ticketing: 1 })
export default class Payment {
  @Prop({
    type: ObjectId,
    default: () => ObjectId(),
    get: ObjectIdToString,
  })
  _id!: string;
  id!: string;

  @Prop({ type: ObjectId, required: true, get: ObjectIdToString })
  ticketignId!: string;

  @Prop({
    ref: 'Ticketing',
    foreignField: '_id',
    localField: 'ticketignId',
    justOne: true,
  })
  ticketing!: Ticketing;

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
