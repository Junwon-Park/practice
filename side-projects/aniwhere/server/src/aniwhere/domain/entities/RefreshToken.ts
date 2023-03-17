import { Index, ModelOptions, Prop } from '@typegoose/typegoose';
import { ObjectId } from 'aniwhere/common/types/mongodb';

@ModelOptions({
  schemaOptions: {
    collection: 'refresh-tokens',
    versionKey: false,
  },
})
@Index({ userId: 1, token: 1 }, { unique: true })
@Index({ expiresIn: 1 }, { expireAfterSeconds: 0 }) // * TTL, expiresIn 필드의 날짜가 되면 0초 뒤에 해당 데이터를 삭제한다.
export default class RefreshToken {
  _id!: ObjectId;

  @Prop({ ref: 'User', required: true })
  userId!: ObjectId;

  @Prop({ type: String, required: true })
  refreshToken!: string;

  @Prop({ type: Date, required: true })
  expiresIn!: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt!: Date;
}
