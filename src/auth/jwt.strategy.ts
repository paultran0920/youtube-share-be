import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { AppConfig } from 'src/app.config';
import { toSafeAccount } from 'src/utils/helpers';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private accountService: AccountService,
    private appConfig: AppConfig,
    private logger: Logger,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig.JWT_KEY,
    });
  }

  async validate(payload: any) {
    this.logger.debug(`Validating the user ${payload.email}.`);
    const { email } = payload;
    const account = await this.accountService.findOneByEmailFullInformation(
      email as string,
    );
    if (!account) {
      throw new UnauthorizedException();
    }
    return toSafeAccount(account);
  }
}
