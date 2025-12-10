import { Controller, Get } from '@nestjs/common';

@Controller('auditoria')
export class AuditoriaController {
  @Get()
  findAll() {
    return 'Auditoria data';
  }
}