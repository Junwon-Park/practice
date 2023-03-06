import { Index, modelOptions, Prop } from '@typegoose/typegoose';
import { ObjectId, ObjectIdToString } from 'src/common/types/mongodb';

@modelOptions({
  schemaOptions: {
    collection: 'user',
    versionKey: false,
    id: true,
  },
})
@Index({ id: 1 })
@Index({ loginId: 1 })
@Index({ name: 1 })
export default class User {
  @Prop({
    type: ObjectId,
    default: () => ObjectId(),
    get: ObjectIdToString,
  })
  _id!: string;
  id!: string;

  @Prop({
    type: String,
    required: true,
  })
  loginId!: string;

  @Prop({
    type: String,
    required: true,
  })
  password!: string;

  @Prop({
    type: String,
    required: true,
  })
  name!: string;

  @Prop({
    type: String,
    required: true,
  })
  nickName!: string;

  @Prop({
    type: String,
    required: true,
  })
  phone!: string;

  @Prop({
    type: String,
    required: true,
  })
  address!: string;

  @Prop({
    type: Boolean,
    required: true,
    default: true,
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
