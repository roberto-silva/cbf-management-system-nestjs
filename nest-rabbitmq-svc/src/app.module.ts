import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './modules/player/player.module';
import { TeamsModule } from './modules/teams/teams.module';
import { TransferModule } from './modules/transfer/transfer.module';

@Module({
  imports: [PlayerModule, TeamsModule, TransferModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
