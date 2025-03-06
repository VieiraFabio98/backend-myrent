import { IRenterRepository } from "@modules/people/repositories/i-renter-repository"
import { inject, injectable } from "tsyringe"
import AppDataSource from "@shared/infra/database/data-source"
import { HttpResponse, serverError } from "@shared/helpers"

interface IRequest {
  id?: string
  locatorId?: string
  name?: string
  email?: string
  phone?: string
  mobilePhone?: string
  status: boolean
}

@injectable()
class UpdateRenterUseCase {
  constructor(
    @inject('RenterRepository')
    private renterRepository: IRenterRepository
  ){}

  async execute({
    id,
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
      const result = await this.renterRepository.update({
        id,
        locatorId,
        name,
        email,
        phone,
        mobilePhone,
        status
      }).then(renterResult => {
        return renterResult
      })
      .catch(error => {
        return error
      })

      return result

    } catch(err) {
      queryRunner.rollbackTransaction()
      throw serverError(err as Error)
    } finally {
      await queryRunner.release()
    }
  }
}

export { UpdateRenterUseCase }