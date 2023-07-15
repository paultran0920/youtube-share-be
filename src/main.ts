import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve('local/.env') });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FileLogger } from './file-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: '*' },
    logger: new FileLogger(),
  });
  await app.listen(process.env.PORT);
}

bootstrap();
