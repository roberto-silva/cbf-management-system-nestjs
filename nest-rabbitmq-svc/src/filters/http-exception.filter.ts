import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HTTP_EXCEPTION_FILTER_ERROR_MESSAGE, HTTP_EXCEPTION_FILTER_STATUS_MESSAGE } from './firlters.consts';

@Catch(HttpExceptionFilter)
export class HttpExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        console.log(`exception: ${JSON.stringify(exception)}`);

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException
            ? exception.getResponse()
            : exception;

        this.logger.error(
            `${HTTP_EXCEPTION_FILTER_STATUS_MESSAGE}: ${status},
         ${HTTP_EXCEPTION_FILTER_ERROR_MESSAGE}: ${JSON.stringify(message)}`
        );

        response.status(status).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            error: message
        });

        return request;
    }

}