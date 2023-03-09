import { Index, modelOptions, Prop } from '@typegoose/typegoose';
import { ObjectId, ObjectIdToString } from 'aniwhere/common/types/mongodb';
import Film from 'aniwhere/domain/entities/Film';
import User from 'aniwhere/domain/entities/User';

@modelOptions({
  schemaOptions: {
    collection: 'ticketing',
    versionKey: false,
    id: true, // id를 true로 하면 _id 속성의 @Prop 옵션에 alias: 'id'를 지정하지 않아도 된다.
    // 이러면 실제 DB 엔티티에는 id라는 필드가 생성되지는 않지만 데이터를 저장하거나 조회할 때, id라는 속성으로 수행할 수 있다.
  },
})
@Index({ id: 1 })
@Index({ filmId: 1 })
@Index({ audienceId: 1 })
export default class Ticketing {
  @Prop({
    type: ObjectId,
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
