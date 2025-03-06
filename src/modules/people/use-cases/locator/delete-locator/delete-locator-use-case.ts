import { ILocatorRepository } from "@modules/people/repositories/i-locator-repository";
import { HttpResponse, serverError } from "@shared/helpers";
import { inject, injectable } from "tsyringe";
import AppDataSource from "@shared/infra/database/data-source";

@injectable()
class DeleteLocatorUseCase {
  constructor(
    @inject('LocatorRepository')
    private locatorRepository: ILocatorRepository
  ){}

  async execute(id: string): Promise<HttpResponse> {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const result = await this.locatorRepository.delete(id)
      .then(locatorResult => {
        return locatorResult
      })
      .catch(error => {
        return error
      })

      return result
      
    } catch (error) {
      queryRunner.rollbackTransaction()
      throw serverError(error as Error)
    } finally {
      queryRunner.release()
    }
  }

}

export { DeleteLocatorUseCase }