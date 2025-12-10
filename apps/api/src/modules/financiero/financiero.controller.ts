import { Controller, Get } from '@nestjs/common';
import { FinancieroService } from './financiero.service';

@Controller('financiero')
export class FinancieroController {
  constructor(private readonly financieroService: FinancieroService) {}

  @Get()
  findAll() {
    return this.financieroService.findAll();
  }
}