import { BaseEntity } from 'src/base/base-entity';
import { ColumnText } from 'src/base/typeorm-plus';
import { Entity } from 'typeorm';

@Entity({ name: 'youtube' })
export class YoutubeEntity extends BaseEntity {
  @ColumnText({ name: 'video_id', length: 255 })
  videoId: string;

  @ColumnText({ name: 'url', length: 2048 })
  url: string;

  @ColumnText({ name: 'title', length: 1000 })
  title: string;

  @ColumnText({ name: 'description', length: 2000 })
  description: string;

  @ColumnText({ name: 'owner', length: 255 })
  owner: string;

  @ColumnText({ name: 'thumbnail_url', length: 2048 })
  thumbnailUrl: string;
}
