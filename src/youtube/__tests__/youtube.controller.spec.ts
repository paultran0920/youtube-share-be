import { BadRequestException, Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { BaseCriteria, SortOrder } from 'src/base/search-criteria';
import { DataSource } from 'typeorm';
import { AppConfig } from '../../app.config';

let mockedFetchVideoInfo = async () => ({
  title: 'title',
  description: 'description',
  owner: 'owner',
  thumbnailUrl: 'thumbnail_url',
  videoId: 'videoId',
});

jest.mock('../fetch.video.info', () => {
  const originalModule = jest.requireActual('../fetch.video.info');
  return {
    __esModule: true,
    ...originalModule,
    fetchVideoInfo: () => mockedFetchVideoInfo(),
  };
});

import { YoutubeEntity } from '../entities/youtube.entity';
import { YoutubeController } from '../youtube.controller';
import { YoutubeRepository } from '../youtube.repository';
import { YoutubeService } from '../youtube.service';

describe('Testing youtube module.', () => {
  const mockedYoutubeEnt: YoutubeEntity = {
    id: 'id-1',
    createdAt: new Date(),
    modifiedAt: new Date(),
    videoId: 'videoId',
    url: 'url',
    title: 'title',
    description: 'description',
    owner: 'owner',
    thumbnailUrl: 'thumbnailUrl',
  };
  const defaultSearchCriteria: BaseCriteria = {
    page: 1,
    pageSize: 10,
    sortColumn: ['createdAt'],
    sort: SortOrder.DESC,
  };

  let youtubeController: YoutubeController;
  let youtubeRepository: YoutubeRepository;

  beforeEach(async () => {
    youtubeRepository = {
      findAndCount: () => jest.fn(),
      save: () => jest.fn(),
    } as any;
    const datasource = {
      getRepository: () => youtubeRepository,
    } as any;

    const moduleRef = await Test.createTestingModule({
      controllers: [YoutubeController],
      providers: [
        YoutubeService,
        AppConfig,
        Logger,
        {
          provide: DataSource,
          useValue: datasource,
        },
      ],
    }).compile();

    youtubeController = moduleRef.get<YoutubeController>(YoutubeController);
  });

  describe('Testing getAllYoutubes', () => {
    it('should able to fetch all shared youtube videos', async () => {
      jest
        .spyOn(youtubeRepository, 'findAndCount')
        .mockImplementation(async () => [[mockedYoutubeEnt], 1]);

      expect(
        await youtubeController.getAllYoutubes(defaultSearchCriteria),
      ).toEqual({
        items: [mockedYoutubeEnt],
        totalPage: 1,
      });
    });

    it('should able to extract video info then save to database', async () => {
      let savedEnt: any = {};
      jest
        .spyOn(youtubeRepository, 'save')
        .mockImplementation(async (data: any) => {
          savedEnt = data;
          return data;
        });

      await youtubeController.shareYoutube({
        url: 'https://www.youtube.com/watch?v=NuS1lMU73aM',
      });

      expect(savedEnt).toEqual({
        title: 'title',
        description: 'description',
        owner: 'owner',
        thumbnailUrl: 'thumbnail_url',
        videoId: 'videoId',
      });
    });

    it('should throw an exception if the URL is not valid', async () => {
      const rs = youtubeController.shareYoutube({
        url: 'invalid',
      });

      expect(rs).rejects.toThrowError(
        new BadRequestException('Can not share this youtube url.'),
      );
    });

    it('should throw an exception if the video id is not valid', async () => {
      const rs = youtubeController.shareYoutube({
        url: 'https://www.youtube.com/watch?param=id',
      });

      expect(rs).rejects.toThrowError(
        new BadRequestException('Can not share this youtube url.'),
      );
    });

    it('should throw an exception if can not load the video information', async () => {
      mockedFetchVideoInfo = jest.fn().mockRejectedValue(new Error('error'));

      const rs = youtubeController.shareYoutube({
        url: 'https://www.youtube.com/watch?v=NuS1lMU73aM',
      });

      expect(rs).rejects.toThrowError(
        new BadRequestException('Can not share this youtube url.'),
      );
    });
  });
});
