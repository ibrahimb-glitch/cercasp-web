import { Test, TestingModule } from '@nestjs/testing'
import { FinancieroController } from '../../../apps/api/src/modules/financiero/financiero.controller'
import { FinancieroService } from '../../../apps/api/src/modules/financiero/financiero.service'

describe('FinancieroController', () => {
  let controller: FinancieroController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinancieroController],
      providers: [FinancieroService],
    }).compile()

    controller = module.get<FinancieroController>(FinancieroController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})