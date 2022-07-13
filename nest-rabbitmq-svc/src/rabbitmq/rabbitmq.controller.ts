import { Logger } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
    ACKE_ERRORS_DUPLICATE_MESSAGE,
    RABBITMQ_BODY_RESPONSE,
    RABBITMQ_CHANEL,
    RABBITMQ_HEADERS_RESPONSE,
    RABBITMQ_URL
} from './rabitmq.consts';

export abstract class RabbitmqController {

    protected logger = new Logger(RabbitmqController.name);

    protected ackeErrors: string[] = [ACKE_ERRORS_DUPLICATE_MESSAGE];

    protected client: ClientProxy;

    constructor(chanel: string = RABBITMQ_CHANEL) {
        this.client = this.setRabbitmqConfig(chanel);
    }

    setRabbitmqConfig(chanel: string): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [RABBITMQ_URL],
                queue: chanel,
                noAck: false,
                queueOptions: {
                    durable: false
                },
            }
        });
    }

    protected sendRequestInChanel(chanel: string, payload: any, req: any): Observable<any> {
        const request: any = {};
        request[RABBITMQ_BODY_RESPONSE] = JSON.stringify(payload);
        request[RABBITMQ_HEADERS_RESPONSE] = req.headers;
        return this.client.send(chanel, request);
    }

    protected emitRequestInChanel(chanel: string, payload: any, req: any): Observable<any> {
        const request: any = {};
        request[RABBITMQ_BODY_RESPONSE] = JSON.stringify(payload);
        request[RABBITMQ_HEADERS_RESPONSE] = req.headers;
        return this.client.send(chanel, request);
    }

}