import { Repository } from 'typeorm';
import { AccountEntity } from './entities/account.entity';
import { ProfileEntity } from './entities/profile.entity';

export class AccountRepository extends Repository<AccountEntity> {}

export class ProfileRepository extends Repository<ProfileEntity> {}
