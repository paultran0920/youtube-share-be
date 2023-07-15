import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccountModule } from 'src/account/account.module';
import { AppConfig } from 'src/app.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AppConfig, AuthService, LocalStrategy, JwtStrategy, Logger],
  exports: [AuthService],
})
export class AuthModule {}
