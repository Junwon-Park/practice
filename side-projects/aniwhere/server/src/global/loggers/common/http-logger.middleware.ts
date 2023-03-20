import { Injectable, Logger } from '@nestjs/common';
import { GlobalConfig } from 'config/global.config';
import { NextFunction, Request } from 'express';
import { Nullable } from 'global/types/natives';
import { IHttpLog } from './types';

@Injectable()
export class HttpLoggerMiddleware {
  private readonly responseLogger = new Logger('ResponseLogger');

  async use(req: Request, res: any, next: NextFunction) {
    const send = res.send;
    res.send = async (body: string) => {
      const isGraphQLRequest = this.isGraphQLRequest(req);
      let log = this.startLog(req);

      if (isGraphQLRequest) {
        log = this.logGraphQL(log, req);
      } else {
        log = this.logRestApi(log, req);
      }

      send.call(res, body);

      if (log.type == null) {
        return;
      }

      this.logFinished(log, body);

      let message: string;
      if (isGraphQLRequest) {
        message = `GraphQL: ${log.operation} ^${log.language} - ${log.processor} ... ${log.elapsed}ms`;
      } else {
        message = `RestApi: ${log.method} ${log.endpoint} ^${log.language} - ${log.processor} ... ${log.elapsed}ms`;
      }

      this.responseLogger.log(message);
    };

    next();
  }

  private startLog(req: Request): IHttpLog {
    return {
      processor: this.getProcessorName(),
      processorUptime: process.uptime(),
      method: req.method,
      endpoint: req.originalUrl,
      type: null,
      operation: null,
      query: null,
      variables: null,
      result: null,
      resultSize: null,
      authToken: req.headers.authorization,
      signature: req.user,
      clientIp: req.ip,
      referer: req.headers['referer'],
      language: this.getAcceptLanguage(req),
      userAgent: req.headers['user-agent'],
      elapsed: null,
      startedAt: new Date(),
      finishedAt: null,
    };
  }

  private isGraphQLRequest(req: Request): boolean {
    const requestBody = req.body || req.query;

    return requestBody['operationName'] && requestBody['query'];
  }

  private logGraphQL(log: IHttpLog, req: Request): IHttpLog {
    const requestBody = req.body || req.query;
    const operation = requestBody['operationName'];
    const query = requestBody['query'];
    const variables = requestBody['variables'];

    if (operation == 'IntrospectionQuery') {
      return log;
    }

    // Masking password
    if (variables) {
      if (variables['password']) variables['password'] = '********';
      if (variables['newPassword']) variables['newPassword'] = '********';
    }

    log.type = 'GraphQL';
    log.operation = operation;
    log.query = query;
    log.variables = variables;

    return log;
  }

  private logRestApi(log: IHttpLog, req: Request): IHttpLog {
    const requestBody = req.body || req.query;

    // Masking password
    if (requestBody) {
      if (requestBody['password']) requestBody['password'] = '********';
      if (requestBody['newPassword']) requestBody['newPassword'] = '********';
    }

    log.type = 'RestApi';
    log.variables = requestBody;

    return log;
  }

  private logFinished(log: IHttpLog, body: string): IHttpLog {
    log.finishedAt = new Date();
    log.elapsed = log.finishedAt.getTime() - log.startedAt.getTime();
    try {
      log.result = JSON.parse(body);
      log.error = JSON.parse(body).errors;
      log.resultSize = body.length;
    } catch (e) {
      // Do nothing
    }
    return log;
  }

  private getAcceptLanguage(req: Request): Nullable<string> {
    const acceptLanguage = req.headers['accept-language'];
    if (acceptLanguage == null) {
      return null;
    }
    const languages = acceptLanguage
      .split(',')
      .map((item: string) => item.split(';')[0].split('-')[0]);
    return languages[0] || null;
  }

  private getProcessorName() {
    return (
      GlobalConfig.APP_NAME +
      '@' +
      GlobalConfig.NODE_ENV +
      '_' +
      GlobalConfig.APP_VERSION +
      '#' +
      process.pid
    );
  }
}
