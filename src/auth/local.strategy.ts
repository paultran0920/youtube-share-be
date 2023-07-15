import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { toHash } from 'src/utils/helpers';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private logger: Logger) {
    super();
  }

  // in the request body, it should be always username, password
  // if not, the framework will not able to detect them
  async validate(username: string, password: string): Promise<any> {
    this.logger.log(`The user ${username} is trying to login!`);
    this.logger.log(await toHash('Abc@123456'));
    const account = await this.authService.validateUser(username, password);
    if (!account) {
      throw new UnauthorizedException();
    }
    this.logger.log(`The user ${username} was logged in!`);
    return account;
  }
}
