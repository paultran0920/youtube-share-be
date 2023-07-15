import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { DeleteDto } from 'src/base/base-dto';
import { Role } from 'src/base/role';
import { BaseCriteria } from 'src/base/search-criteria';
import { toSafeAccount } from 'src/utils/helpers';
import { AccountService } from './account.service';
import { NewAccountDto } from './dtos/create-account.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';
import { AccountEntity } from './entities/account.entity';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly logger: Logger,
  ) {
    logger.debug('Initializing AccountController');
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async fetchProfile(@Request() req): Promise<AccountEntity> {
    this.logger.log('AccountController -> fetchProfile start.');
    return req.user as AccountEntity;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async fetchAccounts(@Query() searchCriteria: BaseCriteria) {
    this.logger.log('AccountController -> fetchAccounts.');
    this.logger.debug('AccountController -> fetchAccounts: ', searchCriteria);
    try {
      const accounts = await this.accountService.findAll(searchCriteria);
      this.logger.debug(
        'AccountController -> fetchAccount entities:',
        accounts,
      );
      this.logger.log('AccountController -> fetchAccount end.');
      return accounts;
    } catch (err: any) {
      this.logger.error(err);
      throw new BadRequestException('Can not fetch accounts.');
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createUserDto: NewAccountDto) {
    this.logger.log('AccountController -> create start.');
    this.logger.debug('AccountController -> create dto:', createUserDto);
    try {
      const account = await this.accountService.create(createUserDto);
      this.logger.debug('AccountController -> create new entity:', account);
      this.logger.log('AccountController -> create end.');
      return account;
    } catch (err: any) {
      this.logger.error(err);
      throw new BadRequestException('Can not create new account.');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Request() req, @Body() updateAccountDto: UpdateAccountDto) {
    const user = req.user as AccountEntity;
    if (user.role !== Role.Admin && user.id !== updateAccountDto.id) {
      throw new BadRequestException(
        'You are not allowed to update other account information!',
      );
    }
    this.logger.log('AccountController -> update start.');
    this.logger.debug('AccountController -> update dto:', updateAccountDto);
    try {
      await this.accountService.update(updateAccountDto);
      this.logger.log('AccountController -> update end.');
    } catch (err: any) {
      this.logger.error(err);
      throw new BadRequestException('Can not create update account.');
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log('AccountController -> findOne start.');
    this.logger.debug('AccountController -> find account id:', id);
    try {
      const user = await this.accountService.findOne(id);
      this.logger.log('AccountController -> findOne end.');
      return toSafeAccount(user);
    } catch (err: any) {
      throw new BadRequestException('Can not fetch account.');
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  async remove(@Query() deleteDto: DeleteDto) {
    this.logger.log('AccountController -> remove start.');
    this.logger.debug('AccountController -> remove account id:', deleteDto.ids);
    try {
      if (Array.isArray(deleteDto.ids)) {
        await this.accountService.removes(deleteDto.ids);
      } else {
        await this.accountService.remove(deleteDto.ids);
      }
      this.logger.log('AccountController -> remove end.');
    } catch (err: any) {
      throw new BadRequestException('Can not remove account.');
    }
  }
}
