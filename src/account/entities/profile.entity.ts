import { BaseEntity } from 'src/base/base-entity';
import { ColumnText, ColumnTextOptional } from 'src/base/typeorm-plus';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity({ name: 'profile' })
export class ProfileEntity extends BaseEntity {
  @ColumnText({ name: 'name' })
  name: string;

  @ColumnText({ name: 'contact' })
  contact: string;

  @ColumnTextOptional({ name: 'avatar' })
  avatar?: string;
  // To store the avatar url in case needed
  avatarUrl?: string;

  @Column({ name: 'account_id', type: 'uuid' })
  accountId: string;

  @OneToOne(() => AccountEntity, (account) => account.profile)
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity;
}
