import { BaseEntity } from 'src/base/base-entity';
import { Role } from 'src/base/role';
import { ColumnText } from 'src/base/typeorm-plus';
import { Entity, OneToOne } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity({ name: 'account' })
export class AccountEntity extends BaseEntity {
  @ColumnText({ name: 'email', length: 255 })
  email: string;

  @ColumnText({ name: 'password', length: 255 })
  password: string;

  @ColumnText({ name: 'status', length: 255 })
  status: AccountStatus;

  @ColumnText({ name: 'role', length: 255 })
  role: Role;

  @OneToOne(() => ProfileEntity, (profile) => profile.account)
  profile?: ProfileEntity;
}

export enum AccountStatus {
  Pending = 'Pending',
  Activated = 'Activated',
  Student = 'Disabled',
}
