import { Controller, Get } from '@nestjs/common';
import { InternosService } from './internos.service';

@Controller('internos')
export class InternosController {
  constructor(private readonly internosService: InternosService) {}

  @Get()
  findAll() {
    return this.internosService.findAll();
  }
}
