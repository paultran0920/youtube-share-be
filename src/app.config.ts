import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfig {
  ROOT_DIR = __dirname;

  PORT: string = process.env.PORT || '8080';
  JWT_KEY: string = process.env.JWT_KEY;

  DB_URL = process.env.DB_PORT;
  USER_NAME = process.env.USER_NAME;
  PASSWORD = process.env.PASSWORD;
  DATABASE = process.env.DATABASE;

  constructor() {
    if (
      !this.JWT_KEY ||
      !this.DB_URL ||
      !this.USER_NAME ||
      !this.PASSWORD ||
      !this.DATABASE
    ) {
      throw new Error('Missing configuration information!');
    }
  }
}
