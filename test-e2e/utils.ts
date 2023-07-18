import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AccountEntity } from 'src/account/entities/account.entity';
import { ProfileEntity } from 'src/account/entities/profile.entity';
import { YoutubeEntity } from 'src/youtube/entities/youtube.entity';
import { CreateTables1689518313994 } from './scripts/1689518313994-create-tables';
import { DefautUsers1689519802443 } from './scripts/1689519802443-defaut-users';

const TYPEORM_CONFIG: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  synchronize: false,
  entities: [AccountEntity, ProfileEntity, YoutubeEntity],
  migrationsRun: true,
  migrations: [CreateTables1689518313994, DefautUsers1689519802443],
};

export const TYPEORM_MODULE = TypeOrmModule.forRoot(TYPEORM_CONFIG);
