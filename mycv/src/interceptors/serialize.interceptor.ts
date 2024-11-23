import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // 요청이 들어오기 전에 실행됨 run something before a request is handled by the route handler
    // by the request handler
    console.log('Im running before the handler', context);
    return handler.handle().pipe(
      map((data: any) => {
        console.log('Im running before response is sent out', data);
      }),
    );
  }
}
// implements는 extends와 다름 모든 조건을 만족하는 것
