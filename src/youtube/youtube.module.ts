import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from 'src/app.config';
import { YoutubeEntity } from './entities/youtube.entity';
import { YoutubeController } from './youtube.controller';
import { YoutubeService } from './youtube.service';

@Module({
  controllers: [YoutubeController],
  providers: [YoutubeService, AppConfig, Logger],
  imports: [TypeOrmModule.forFeature([YoutubeEntity])],
})
export class YoutubeModule {}
