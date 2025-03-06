import { IRenterRepository } from "@modules/people/repositories/i-renter-repository";
import { HttpResponse } from "@shared/helpers";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteRenterUseCase {
  constructor(
    @inject('RenterRepository')
    private renterRepository: IRenterRepository
  ){}

  async execute(id: string): Promise<HttpResponse> {

    const result = await this.renterRepository.delete(id)
    .then(renterResult => {
      return renterResult
    })
    .catch(error => {
      return error
    })

    return result
  }
}

export { DeleteRenterUseCase }