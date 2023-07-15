import { Repository } from 'typeorm';
import { YoutubeEntity } from './entities/youtube.entity';

export class YoutubeRepository extends Repository<YoutubeEntity> {}
