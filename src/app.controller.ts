import { Controller, Get, Logger } from '@nestjs/common';

@Controller('/')
export class AppController {
  constructor(private logger: Logger) {}

  @Get('ping')
  async ping() {
    this.logger.log('Hey ping me!');
    return 'pong';
  }
}
