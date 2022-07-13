import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as momentTimezone from 'moment-timezone';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(AppModule);

    Date.prototype.toJSON = () => {
        return momentTimezone(this)
            .tz('America/Sao_Paulo')
            .format('YYYY-MM-DD HH:mm:ss.SSS');
    }

    app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}),);
    app.useGlobalInterceptors(new TimeoutInterceptor());
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(3000);
}

bootstrap();
