import { LoggerService } from '@nestjs/common';
import { Logger, pino } from 'pino';

/**
 * This class is a wrapper of pino logger
 * Will can integrate with cloud logging services if needed later
 */
export class FileLogger implements LoggerService {
  private logger: Logger;

  constructor() {
    const baseLogger = pino(pino.transport({ target: 'pino-pretty' }));

    this.logger = baseLogger.child(
      { appName: process.env.APP_NAME ?? 'YoutubeShare' },
      {
        level: process.env.LOG_LEVEL?.toLowerCase() || 'debug',
        formatters: {
          log: (logMessage: object) => ({
            ...logMessage,
          }),
        },
      },
    );
  }

  log(obj: any, ...params: any[]) {
    const [logObj, msg, ...rest] = this.getObj(obj, params);
    this.logger.info(logObj, ...msg, ...rest);
  }

  error(obj: any, ...params: any[]) {
    const [logObj, msg, ...rest] = this.getObj(obj, params);
    this.logger.error(logObj, ...msg, ...rest);
  }

  warn(obj: any, ...params: any[]) {
    const [logObj, msg, ...rest] = this.getObj(obj, params);
    this.logger.warn(logObj, ...msg, ...rest);
  }

  debug(obj: any, ...params: any[]) {
    const [logObj, msg, ...rest] = this.getObj(obj, params);
    this.logger.debug(logObj, ...msg, ...rest);
  }

  verbose(obj: any, ...params: any[]) {
    const [logObj, msg, ...rest] = this.getObj(obj, params);
    this.logger.trace(logObj, ...msg, ...rest);
  }

  private getObj(obj: any, ...params: any[]) {
    if (typeof obj === 'object') {
      return [obj, ...params];
    } else {
      return [{}, [obj, ...params]];
    }
  }
}
