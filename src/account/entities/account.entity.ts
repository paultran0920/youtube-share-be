import { BaseEntity } from 'src/base/base-entity';
import { Role } from 'src/base/role';
import { ColumnText } from 'src/base/typeorm-plus';
import { Entity, OneToOne } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity({ name: 'account' })
export class AccountEntity extends BaseEntity {
  @ColumnText({ name: 'email' })
  email: string;

  @ColumnText({ name: 'password' })
  password: string;

  @ColumnText({ name: 'status' })
  status: AccountStatus;

  @ColumnText({ name: 'role' })
  role: Role;

  @OneToOne(() => ProfileEntity, (profile) => profile.account)
  profile?: ProfileEntity;
}

export enum AccountStatus {
  Pending = 'Pending',
  Activated = 'Activated',
  Student = 'Disabled',
}
