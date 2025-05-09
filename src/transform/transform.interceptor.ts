/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const msg = response?.msg || 'success';
        const data = response?.data ?? response;
        return {
          code: context.switchToHttp().getResponse().statusCode,
          data,
          msg,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
