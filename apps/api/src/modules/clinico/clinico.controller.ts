import { Controller, Get } from '@nestjs/common';

@Controller('clinico')
export class ClinicoController {
  @Get()
  findAll() {
    return 'Clinico data';
  }
}