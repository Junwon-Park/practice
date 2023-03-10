import { JwtModule } from '@nestjs/jwt';
import { DynamicModule } from '@nestjs/common';

export const DefaultAniwhereJwtAuthModule = (
  expiresIn?: string | number,
): DynamicModule => {
  return JwtModule.register({
    secret: process.env.AUTH_TOKEN_JWT_SECRET,
    signOptions: { expiresIn: expiresIn || '30d' },
  });
};
