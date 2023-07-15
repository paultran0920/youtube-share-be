import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from 'src/app.config';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountEntity } from './entities/account.entity';
import { ProfileEntity } from './entities/profile.entity';

@Module({
  controllers: [AccountController],
  providers: [AccountService, AppConfig, Logger],
  imports: [TypeOrmModule.forFeature([AccountEntity, ProfileEntity])],
  exports: [AccountService],
})
export class AccountModule {}
