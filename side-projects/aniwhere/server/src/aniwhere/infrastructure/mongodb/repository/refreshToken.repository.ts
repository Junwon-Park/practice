import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import RefreshToken from 'aniwhere/domain/entities/RefreshToken';
import { ObjectId } from 'global/types/mongodb';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export default class RefreshTokenRepository {
  constructor(
    @InjectModel(RefreshToken)
    private readonly refreshTokenMdoel: ReturnModelType<typeof RefreshToken>,
  ) {}

  async test(input: string): Promise<RefreshToken> {
    console.log(input);
    return await this.refreshTokenMdoel.create({
      //   _id: ObjectId(),
      userId: ObjectId(),
      refreshToken: 'test',
      expiresIn: Date.now(),
      createdAt: Date.now(),
    });
  }
}
