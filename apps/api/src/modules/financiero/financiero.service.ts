import { Injectable } from '@nestjs/common';

@Injectable()
export class FinancieroService {
  findAll() {
    return 'All financiero';
  }
}