import { IRenterRepository } from "@modules/people/repositories/i-renter-repository";
import { HttpResponse } from "@shared/helpers";
import { inject, injectable } from "tsyringe";


@injectable()
class GetRenterUseCase {
  constructor(
    @inject('RenterRepository')
    private renterRepository: IRenterRepository
  ){}

  async execute(id: string): Promise<HttpResponse> {
    const result = await this.renterRepository.get(id)
    .then(renterResult => {
      return renterResult
    })
    .catch(error => {
      return error
    })

    return result
  }
}

export { GetRenterUseCase}