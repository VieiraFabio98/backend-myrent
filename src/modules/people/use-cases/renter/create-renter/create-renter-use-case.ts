import { IRenterRepository } from "@modules/people/repositories/i-renter-repository"
import { inject, injectable } from "tsyringe"
import AppDataSource from "@shared/infra/database/data-source"
import { HttpResponse, serverError } from "@shared/helpers"

interface IRequest {
  locatorId?: string
  name?: string
  email?: string
  phone?: string
  mobilePhone?: string
  status: boolean
}

@injectable()
class CreateRenterUseCase {
  constructor(
    @inject('RenterRepository')
    private renterRepository: IRenterRepository
  ){}

  async execute({
    locatorId,
    name,
    email,
    phone,
    mobilePhone,
    status
  }: IRequest): Promise<HttpResponse> {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const result = await this.renterRepository.create({
        locatorId,
        name,
        email,
        phone,
        mobilePhone,
        status
      }, queryRunner)

      await queryRunner.commitTransaction()
      return result

    } catch(err) {
      queryRunner.rollbackTransaction()
      throw serverError(err as Error)
    } finally {
      await queryRunner.release()
    }
  }
}

export { CreateRenterUseCase }