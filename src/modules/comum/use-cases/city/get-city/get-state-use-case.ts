import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { ICityRepository } from '@modules/comum/repositories/i-city-repository'

@injectable()
class GetCityUseCase {
  constructor(@inject('CityRepository')
    private cityRepository: ICityRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const estado = await this.cityRepository.getAllByStateId(id)

    return estado
  }
}

export { GetCityUseCase }
