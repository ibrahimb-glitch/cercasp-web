import { Injectable } from '@nestjs/common';

@Injectable()
export class InternosService {
  findAll() {
    return 'All internos';
  }
}
