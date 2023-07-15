import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { BaseCriteria, ListResult } from 'src/base/search-criteria';
import { toOrder, toSkip, toTotal } from 'src/base/typeorm-plus';
import { DataSource, Like } from 'typeorm';
import { YoutubeEntity } from './entities/youtube.entity';
import { YoutubeRepository } from './youtube.repository';
import * as fetchVideoInfo from 'updated-youtube-info';
import { VideoInfoDto } from './dtos/video-info.dto';

@Injectable()
export class YoutubeService {
  private youtubeRepository!: YoutubeRepository;

  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    private logger: Logger,
  ) {
    this.youtubeRepository = this.dataSource.getRepository(YoutubeEntity);
  }

  async findOne(id: string): Promise<YoutubeEntity | undefined> {
    const youtube = await this.youtubeRepository.findOne({
      where: { id: id },
    });
    return youtube;
  }

  async findAll(
    searchCriteria: BaseCriteria,
  ): Promise<ListResult<YoutubeEntity>> {
    const whereQuery: any = {};
    if (searchCriteria.searchCriteria) {
      whereQuery.where = [
        {
          title: searchCriteria.searchCriteria
            ? Like(`%${searchCriteria?.searchCriteria}%`)
            : undefined,
          description: searchCriteria.searchCriteria
            ? Like(`%${searchCriteria?.searchCriteria}%`)
            : undefined,
        },
      ];
    }
    const [items, count] = await this.youtubeRepository.findAndCount({
      ...whereQuery,
      order: toOrder(searchCriteria.sortColumn, searchCriteria.sort),
      skip: toSkip(+searchCriteria?.page, +searchCriteria?.pageSize),
      take: +searchCriteria?.pageSize,
    });

    return {
      totalPage: toTotal(count, +searchCriteria?.pageSize),
      items,
    };
  }

  async share(url: string): Promise<YoutubeEntity> {
    this.logger.debug(`Retrieving information for youtube url: ${url}`);

    const youtubeUrl = new URL(url);
    const youtubeId = youtubeUrl.searchParams.get('v');
    if (!youtubeId) {
      throw new Error('Invalid youtube url');
    }

    const videoInfo: VideoInfoDto = await new Promise((resolve, reject) => {
      fetchVideoInfo(youtubeId)
        .then(function (videoInfo) {
          resolve(videoInfo);
        })
        .catch(function (err) {
          reject(err);
        });
    });

    this.logger.debug(
      {
        videoInfo,
      },
      `Retrieved information for youtube url: ${url}`,
    );

    const newYoutube = new YoutubeEntity();
    newYoutube.description = videoInfo.description;
    newYoutube.owner = videoInfo.owner;
    newYoutube.thumbnailUrl = videoInfo.thumbnailUrl;
    newYoutube.title = videoInfo.title;
    newYoutube.url = videoInfo.url;
    newYoutube.videoId = videoInfo.videoId;

    return this.youtubeRepository.save(newYoutube);
  }

  async remove(id: string): Promise<void> {
    await this.youtubeRepository.delete(id);
  }
}
