import { Index, modelOptions, Prop } from '@typegoose/typegoose';
import { ObjectId, ObjectIdToString } from 'src/common/types/mongodb';
import Distributor from './Distributor';
import User from './User';

@modelOptions({
  schemaOptions: {
    collection: 'film',
    versionKey: false,
    id: true,
  },
})
@Index({ id: 1 })
@Index({ directorId: 1 })
@Index({ distributorId: 1 })
export default class Film {
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
    // Populate를 위한 가상 필드(실제 DB에 생성되지 않음)
    ref: 'User',
    foreignField: '_id', // ref: User의 _id
    localField: 'directorId', // 이 Entity의 directorId
    justOne: true, // foreignField와 localField가 일치하는 Document 하나만 가져오는 옵션
    // true로 하지 않으면 1 : 1인지 1 : N인지 알 수 없기 때문에 배열[]로 가져온다.(Default: false) ex_) director!: User[]
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
