import { Controller, Get, Param, Req } from '@nestjs/common';
import { RabbitmqController } from '../../rabbitmq/rabbitmq.controller';
import { Observable } from 'rxjs';

@Controller('player')
export class PlayerController extends RabbitmqController {

    constructor() {
        super('player');
    }

    @Get()
    private async findAll(@Param() request: any, @Req() req
    ): Promise<Observable<any>> {
        return this.sendRequestInChanel('findAll', request, req);
    }
}
