import { ILocatorRepository } from "@modules/people/repositories/i-locator-repository";
import { inject, injectable } from "tsyringe";
import AppDataSource from "@shared/infra/database/data-source";
import { Server } from "http";
import { HttpResponse, serverError } from "@shared/helpers";
import { ok } from "assert";

interface IRequest {
  userId: string
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
class CreateUserUseCase {
  constructor(
    @inject('LocatorRepository')
    private locatorRepository: ILocatorRepository
  ){}

  async execute({
    userId,
    name,
    email,
    phone,
    mobilePhone,
    address,
    number,
    complement,
    status,
  }: IRequest): Promise<HttpResponse>{
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const result = await this.locatorRepository.create({
        userId,
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

export { CreateUserUseCase }