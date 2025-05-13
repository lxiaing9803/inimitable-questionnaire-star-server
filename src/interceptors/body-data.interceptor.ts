/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/common/interceptors/body-data.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BodyDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // 只处理 POST 请求
    if (request.method === 'POST') {
      // 如果 body 中有 data 属性，则替换整个 body
      if (request.body && request.body.data !== undefined) {
        request.body = request.body.data;
      }
    }

    return next.handle();
  }
}
