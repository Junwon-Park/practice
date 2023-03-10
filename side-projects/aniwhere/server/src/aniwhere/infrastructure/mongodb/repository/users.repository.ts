import { ReturnModelType } from '@typegoose/typegoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import User from 'aniwhere/domain/entities/User';

@Injectable()
export default class UserRepository {
  constructor(
    @InjectModel(User)
    private readonly aniwhereUserModel: ReturnModelType<typeof User>,
  ) {}

  async findUserByLoginId(loginId: string): Promise<User> {
    return this.aniwhereUserModel.findOne({ loginId });
  }
}
