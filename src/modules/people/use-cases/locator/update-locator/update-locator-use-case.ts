import AppDataSource from "@shared/infra/database/data-source";
import { ILocatorRepository } from '@modules/people/repositories/i-locator-repository';
import { HttpResponse, serverError } from '@shared/helpers';
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string
  name: string
  email?: string
  phone?: string
  mobilePhone?: string
  address?: string
  number?: string
  complement?: string
  status: boolean
}

@injectable()
class UpdateLocatorUseCase {
  constructor(
    @inject('LocatorRepository')
    private LocatorRepository: ILocatorRepository
  ){}

  async execute({
    id,
    name,
    email,
    phone,
    mobilePhone,
    address,
    number,
    complement,
    status,
  }: IRequest): Promise<HttpResponse> {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const result = await this.LocatorRepository.update({
        id,
        name,
        email,
        phone,
        mobilePhone,
        address,
        number,
        complement,
        status
      }).then(locatorResult => {
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

export { UpdateLocatorUseCase }