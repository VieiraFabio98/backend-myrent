import { ILocatorRepository } from "@modules/people/repositories/i-locator-repository";
import { HttpResponse } from "@shared/helpers";
import { inject, injectable } from "tsyringe";


@injectable()
class GetLocatorUseCase {
  constructor(
    @inject('LocatorRepository')
    private locatorRepository: ILocatorRepository
  ){}

  async execute(id: string): Promise<HttpResponse> {
    const locator = await this.locatorRepository.get(id)

    return locator
  }
}

export { GetLocatorUseCase }