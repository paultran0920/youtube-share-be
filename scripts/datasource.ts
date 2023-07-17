import { DataSource } from 'typeorm';
import { CreateTables1689518313994 } from './1689518313994-create-tables';
import { DefautUsers1689519802443 } from './1689519802443-defaut-users';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 13306,
  username: 'youtube_share_user',
  password: 'youtube_share_password',
  database: 'youtube-share-db',
  // Add all migration scripts here, it will run only the ones have not run yet
  // See generated migrations table for the time
  migrations: [CreateTables1689518313994, DefautUsers1689519802443],
});
