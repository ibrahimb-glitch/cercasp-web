import { Controller, Get } from '@nestjs/common';

@Controller('cumplimiento')
export class CumplimientoController {
  @Get()
  findAll() {
    return 'Cumplimiento data';
  }
}