import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from 'src/account/account.service';
import { AccountEntity } from 'src/account/entities/account.entity';
import { AppConfig } from 'src/app.config';
import { isMatch, toSafeAccount } from 'src/utils/helpers';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
    private logger: Logger,
    private appConfig: AppConfig,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    this.logger.debug(`Trying to validate the user ${email}!`);
    const account = await this.accountService.findOneByEmailFullInformation(
      email,
    );
    if (account && (await isMatch(password, account.password))) {
      this.logger.debug(`The user ${email} is valid!`);
      return toSafeAccount(account);
    }
    return null;
  }

  async login(account: AccountEntity) {
    this.logger.debug(`Creating access_token for ${account.email}!`);
    const payload = {
      email: account.email,
      role: account.role,
      profile: account.profile,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.appConfig.JWT_KEY, // Add it here as register in module does not work
        expiresIn: '1d',
      }),
    };
  }

  generateResetPasswordLink = async (email: string) => {
    let account: AccountEntity;
    try {
      account = await this.accountService.findOneByEmailFullInformation(email);
      if (!account) {
        throw new Error(`The email address does not exist.`);
      }
    } catch (error) {
      this.logger.error(error);
      throw new Error(`The email address does not exist.`);
    }
    try {
      this.logger.log('Not yet implemented. Generating reset password email.');
    } catch (error) {
      this.logger.error(error);
      throw new Error(`Can not send reset password email.`);
    }
  };

  resetPassword = async (token: string, password: string) => {
    const data = this.jwtService.verify(token, {
      secret: this.appConfig.JWT_KEY,
    });
    if (!data) {
      throw new Error('This reset password link has been expired.');
    }
    try {
      await this.accountService.updatePassword(data.email, password);
    } catch (error) {
      this.logger.error(error);
      throw new Error(`Can not update the password.`);
    }
  };

  changePassword = async (
    email: string,
    currentPassword: string,
    newPassword: string,
  ) => {
    const account = await this.accountService.findOneByEmailFullInformation(
      email,
    );
    const isValid = await isMatch(currentPassword, account.password);
    if (!isValid) {
      throw new Error('Current password is incorrect.');
    }
    try {
      await this.accountService.updatePassword(email, newPassword);
    } catch (error) {
      this.logger.error(error);
      throw new Error(`Can not update the password.`);
    }
  };
}
