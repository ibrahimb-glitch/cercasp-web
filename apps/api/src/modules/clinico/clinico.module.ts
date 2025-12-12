import { Module } from '@nestjs/common';
import { ClinicoController } from './clinico.controller';
import { ClinicoService } from './clinico.service';

@Module({
  controllers: [ClinicoController],
  providers: [ClinicoService],
})
export class ClinicoModule {}
