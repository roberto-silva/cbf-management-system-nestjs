import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, timeout } from 'rxjs';
import { TIMEOUT_WAIT } from './interceptors.consts';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next
            .handle()
            .pipe(timeout(TIMEOUT_WAIT));
    }
}