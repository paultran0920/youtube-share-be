import { BaseEntity } from 'src/base/base-entity';
import { ColumnText } from 'src/base/typeorm-plus';
import { Entity } from 'typeorm';

@Entity({ name: 'youtube' })
export class YoutubeEntity extends BaseEntity {
  @ColumnText({ name: 'video_id' })
  videoId: string;

  @ColumnText({ name: 'url' })
  url: string;

  @ColumnText({ name: 'title' })
  title: string;

  @ColumnText({ name: 'description' })
  description: string;

  @ColumnText({ name: 'owner' })
  owner: string;

  @ColumnText({ name: 'thumbnail_url' })
  thumbnailUrl: string;
}
