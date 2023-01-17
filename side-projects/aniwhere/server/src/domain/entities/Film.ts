import { Index, modelOptions, Prop, Ref } from '@typegoose/typegoose';
import { ObjectId, ObjectIdToString } from 'src/common/types/mongodb';
import Distributor from './Distributor';
import User from './User';

@modelOptions({
  schemaOptions: {
    collection: 'film',
    versionKey: false,
  },
})
@Index({ id: 1 })
@Index({ directorId: 1 })
@Index({ distributorId: 1 })
export default class Film {
  @Prop({
    type: ObjectId,
    alias: 'id',
    default: () => ObjectId(),
    get: ObjectIdToString,
  })
  _id!: string;
  id!: string;

  @Prop({ type: ObjectId, required: true, get: ObjectIdToString })
  directorId!: string;

  @Prop({
    // Populate를 위한 가상 필드(실제 DB에 생성되지 않음)
    ref: 'User',
    foreignField: '_id',
    localField: 'directorId',
    justOne: true,
  })
  director!: User;

  @Prop({ type: ObjectId, required: true, get: ObjectIdToString })
  distributorId!: string;

  @Prop({
    ref: 'Distributor',
    foreignField: '_id',
    localField: 'distributorId',
    justOne: true,
  })
  distributor!: Distributor;

  @Prop({
    type: String,
    required: true,
  })
  title!: string;

  @Prop({
    type: String,
    required: true,
  })
  summary!: string;

  @Prop({
    type: String,
    required: true,
  })
  thumbnail!: string;

  @Prop({
    type: String,
    required: true,
  })
  filmUrl!: string;

  @Prop({
    type: String,
    required: true,
  })
  category!: string;

  @Prop({
    type: Number,
    required: false,
  })
  price!: number;

  @Prop({
    type: Boolean,
    required: true,
  })
  isFree!: boolean;

  @Prop({
    type: Boolean,
    required: true,
  })
  isHide!: boolean;

  @Prop({
    type: Boolean,
    required: true,
  })
  isActive!: boolean;

  @Prop({
    type: Boolean,
    required: true,
  })
  isLive!: boolean;

  @Prop({
    type: Date,
    required: false,
  })
  startedAt?: Date;

  @Prop({
    type: Date,
    required: false,
  })
  endedAt?: Date;

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
