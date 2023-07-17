import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { AppConfig } from './app.config';
import { AppController } from './app.controller';
import { AppGatewayModule } from './appgateway/app.gateway.module';
import { AuthModule } from './auth/auth.module';
import { YoutubeModule } from './youtube/youtube.module';

@Module({
  imports: [
    // Register with root then it will available for all module without re-import
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_URL,
      port: +process.env.DB_PORT,
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      charset: 'utf8mb4',
      synchronize: false,
    }),
    AccountModule,
    AuthModule,
    YoutubeModule,
    AppGatewayModule,
  ],
  controllers: [AppController],
  providers: [AppConfig, Logger],
})
export class AppModule {}
