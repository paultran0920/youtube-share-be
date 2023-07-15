import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BaseCriteria } from 'src/base/search-criteria';
import { ShareYoutubeDto } from './dtos/share-youtube.dto';
import { YoutubeEntity } from './entities/youtube.entity';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {
  constructor(
    private readonly youtubeService: YoutubeService,
    private readonly logger: Logger,
  ) {
    logger.debug('Initializing YoutubeController');
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getYoutube(@Param('id') id: string): Promise<YoutubeEntity> {
    this.logger.log('YoutubeController -> getYoutube start.');
    try {
      const youtubeEnt = await this.youtubeService.findOne(id);
      this.logger.log('YoutubeController -> getYoutube end.');
      return youtubeEnt;
    } catch (err: any) {
      this.logger.error(err);
      throw new BadRequestException('Can not get this shared youtube detail.');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllYoutubes(@Query() searchCriteria: BaseCriteria) {
    this.logger.log('YoutubeController -> getAllYoutubes start.');
    try {
      const youtubeEnts = await this.youtubeService.findAll(searchCriteria);
      this.logger.log('YoutubeController -> getAllYoutubes end.');
      return youtubeEnts;
    } catch (err: any) {
      this.logger.error(err);
      throw new BadRequestException(
        'Can not get the shared youtube information.',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/share')
  async shareYoutube(
    @Body() shareYoutubeDto: ShareYoutubeDto,
  ): Promise<YoutubeEntity> {
    this.logger.log('YoutubeController -> shareYoutube start.');
    try {
      const youtubeEnt = await this.youtubeService.share(shareYoutubeDto.url);
      this.logger.log('YoutubeController -> shareYoutube end.');
      return youtubeEnt;
    } catch (err: any) {
      this.logger.error(err);
      throw new BadRequestException('Can not share this youtube url.');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteYoutube(@Param('id') id: string): Promise<void> {
    this.logger.log('YoutubeController -> deleteYoutube start.');
    try {
      await this.youtubeService.remove(id);
      this.logger.log('YoutubeController -> deleteYoutube end.');
    } catch (err: any) {
      this.logger.error(err);
      throw new BadRequestException('Can not delete this shared youtube url.');
    }
  }
}
