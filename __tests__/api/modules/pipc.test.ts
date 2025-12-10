import { Test, TestingModule } from '@nestjs/testing'
import { PipcController } from '../../../apps/api/src/modules/pipc/pipc.controller'
import { PipcService } from '../../../apps/api/src/modules/pipc/pipc.service'

describe('PipcController', () => {
  let controller: PipcController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PipcController],
      providers: [PipcService],
    }).compile()

    controller = module.get<PipcController>(PipcController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})