import { Injectable } from '@nestjs/common';

@Injectable()
export class PipcService {
  findAll() {
    return 'PIPC service';
  }
}