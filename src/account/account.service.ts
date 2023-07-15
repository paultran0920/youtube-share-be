import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { BaseCriteria, ListResult } from 'src/base/search-criteria';
import { toOrder, toSkip, toTotal } from 'src/base/typeorm-plus';
import { toHash } from 'src/utils/helpers';
import { DataSource, In, Like } from 'typeorm';
import { AccountRepository, ProfileRepository } from './account.repository';
import { NewAccountDto } from './dtos/create-account.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';
import { AccountEntity, AccountStatus } from './entities/account.entity';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class AccountService {
  private accountRepository!: AccountRepository;
  private profileRepository!: ProfileRepository;

  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {
    // Work around solution as the repository injection does not work for now. Why?
    this.accountRepository = this.dataSource.getRepository(AccountEntity);
    this.profileRepository = this.dataSource.getRepository(ProfileEntity);
  }

  /**
   * Find full account information for login
   * @param email
   * @returns
   */
  async findOneByEmailFullInformation(
    email: string,
  ): Promise<AccountEntity | undefined> {
    const account = await this.accountRepository.findOne({
      where: { email: email },
      relations: ['profile'],
    });
    if (account.profile?.avatar) {
      account.profile.avatarUrl = `Presigned URL for ${account.profile.avatar}`;
    }
    return account;
  }

  async findOne(id: string): Promise<AccountEntity | undefined> {
    const account = await this.accountRepository.findOne({
      where: { id: id },
      relations: ['profile'],
    });

    if (account.profile?.avatar) {
      account.profile.avatarUrl = `Presigned URL for ${account.profile.avatar}`;
    }

    return _.omit(account, ['password']);
  }

  async findAll(
    searchCriteria: BaseCriteria,
  ): Promise<ListResult<AccountEntity>> {
    const whereQuery: any = {};
    if (searchCriteria.searchCriteria) {
      whereQuery.where = [
        {
          profile: searchCriteria.searchCriteria
            ? {
                name: Like(`%${searchCriteria?.searchCriteria}%`),
              }
            : undefined,
        },
        {
          profile: searchCriteria.searchCriteria
            ? {
                contact: Like(`%${searchCriteria?.searchCriteria}%`),
              }
            : undefined,
        },
        {
          email: searchCriteria.searchCriteria
            ? Like(`%${searchCriteria?.searchCriteria}%`)
            : undefined,
        },
      ];
    }
    const [items, count] = await this.accountRepository.findAndCount({
      ...whereQuery,
      order: toOrder(searchCriteria.sortColumn, searchCriteria.sort),
      skip: toSkip(+searchCriteria?.page, +searchCriteria?.pageSize),
      take: +searchCriteria?.pageSize,
      relations: ['profile'],
    });

    for (const account of items) {
      if (account.profile?.avatar) {
        account.profile.avatarUrl = `Presigned URL for ${account.profile.avatar}`;
      }
    }

    return {
      totalPage: toTotal(count, +searchCriteria?.pageSize),
      items: items.map((v) => _.omit(v, ['password'])),
    };
  }

  async create(accountUserDto: NewAccountDto) {
    const account = {
      status: accountUserDto.status || AccountStatus.Pending,
      email: accountUserDto.email,
      password: await toHash(accountUserDto.password),
      role: accountUserDto.role,
    };

    const newAccount = await this.accountRepository.save(account);
    const newAvatar = accountUserDto.avatar;

    const profile = {
      accountId: newAccount.id,
      name: accountUserDto.name,
      contact: accountUserDto.contact,
      avatar: newAvatar,
    };

    const newProfile: ProfileEntity = await this.profileRepository.save(
      profile,
    );

    newAccount.profile = newProfile;

    // Make the new file persistent
    // Save avatar to S3

    return _.omit(newAccount, ['password']);
  }

  async update(accountUserDto: UpdateAccountDto) {
    const oldAccount = await this.accountRepository.findOne({
      where: { id: accountUserDto.id },
      relations: ['profile'],
    });
    if (!oldAccount) {
      throw new Error(`Account ${accountUserDto.id} not found!`);
    }

    // const oldAvatar = oldAccount.profile?.avatar;
    const newAvatar = accountUserDto.profile.avatar;

    const newProfile = {
      ...oldAccount.profile,
      name: accountUserDto.profile.name,
      contact: accountUserDto.profile.contact,
      avatar: newAvatar,
    };

    const profileEntity: ProfileEntity = await this.profileRepository.save(
      newProfile,
    );
    oldAccount.profile = profileEntity;

    // Update avatar in S3

    return _.omit(oldAccount, ['password']);
  }

  async updatePassword(email: string, password: string) {
    const account = await this.findOneByEmailFullInformation(email);
    if (!account) {
      throw new Error(`Account does not exist.`);
    }

    account.password = await toHash(password);
    await this.accountRepository.save(account);
  }

  async remove(id: string) {
    const account = await this.accountRepository.findOne({
      where: { id: id },
      relations: ['profile'],
    });
    await this.profileRepository.delete({ accountId: account.id });
    await this.accountRepository.delete(id);

    // Delete avatar in S3
  }

  async removes(ids: string[]) {
    const accounts = await this.accountRepository.find({
      where: { id: In(ids) },
      relations: ['profile'],
    });
    await this.profileRepository.delete({
      accountId: In(accounts.map((v) => v.id)),
    });
    await this.accountRepository.delete({
      id: In(ids),
    });

    // Delete avatars in S3
  }
}
