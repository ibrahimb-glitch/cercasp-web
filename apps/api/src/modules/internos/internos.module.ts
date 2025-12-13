import { Module } from '@nestjs/common';
import { InternosController } from './internos.controller';
import { InternosService } from './internos.service';

@Module({
  controllers: [InternosController],
  providers: [InternosService],
})
export class InternosModule {}
