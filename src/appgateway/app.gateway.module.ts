import { Logger, Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';

@Module({
  providers: [AppGateway, Logger],
})
export class AppGatewayModule {}
