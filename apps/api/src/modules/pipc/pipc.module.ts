import { Module } from '@nestjs/common';
import { PipcController } from './pipc.controller';
import { PipcService } from './pipc.service';

@Module({
  controllers: [PipcController],
  providers: [PipcService],
})
export class PipcModule {}
