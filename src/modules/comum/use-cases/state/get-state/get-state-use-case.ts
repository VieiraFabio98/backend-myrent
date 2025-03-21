import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { IStateRepository } from '@modules/comum/repositories/i-state-repository'

@injectable()
class GetStateUseCase {
  constructor(@inject('StateRepository')
    private stateRepository: IStateRepository
  ) {}

  async execute(): Promise<HttpResponse> {
    const estado = await this.stateRepository.getAll()

    return estado
  }
}

export { GetStateUseCase }
