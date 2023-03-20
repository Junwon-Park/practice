import { Index, modelOptions, Prop } from '@typegoose/typegoose';
import { ObjectId, ObjectIdToString } from 'global/types/mongodb';

@modelOptions({
  schemaOptions: {
    collection: 'user',
    versionKey: false,
    id: true, // id를 true로 하면 _id 속성의 @Prop 옵션에 alias: 'id'를 지정하지 않아도 된다.
    // 이러면 실제 DB 엔티티에는 id라는 필드가 생성되지는 않지만 데이터를 저장하거나 조회할 때, id라는 속성으로 수행할 수 있다.
  },
})
@Index({ loginId: 1 })
@Index({ id: 1 })
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
