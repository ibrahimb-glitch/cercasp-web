import { Controller, Get } from '@nestjs/common';

@Controller('pipc')
export class PipcController {
  @Get()
  findAll() {
    return 'PIPC data';
  }
}
