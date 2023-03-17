import { Index, modelOptions, Prop } from '@typegoose/typegoose';
import { ObjectId, ObjectIdToString } from 'aniwhere/common/types/mongodb';
import User from 'aniwhere/domain/entities/User';

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

  // ~ Populate 필드
  @Prop({
    // * type 옵션이 지정되어 있지 않기 때문에 실제 DB에는 이 필드가 존재하지 않는다.
    ref: 'User', // Populate 할 때, 참조할 컬렉션
    foreignField: '_id', // User의 _id
    localField: 'directorId', // Distributor의 directorId
    justOne: true, // Populate 하면 배열 형태로 값이 들어오는데, justOne: true로 하면 해당 객체가 들어온다.
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
