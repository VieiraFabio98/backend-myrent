import { IRenterDTO } from "@modules/people/dto/renter";
import { IRenterRepository } from "@modules/people/repositories/i-renter-repository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface IResponse {
  items: IRenterDTO[],
  hasNext: boolean
}

@injectable()
class ListRenterUseCase {
  constructor(
    @inject('RenterRepository')
    private renterRepository: IRenterRepository
  ){}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 10,
    order = '',
    filter
  }: IRequest): Promise<IResponse>{
    const newPage = page !== 0 ? page - 1 : 0

    const renters = await this.renterRepository.listByLocatorId(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countRenters = await this.renterRepository.count(search, filter)
    
    const numberRenter = page * rowsPerPage

    const renterResponse = {
      items: renters.data,
      hasNext: numberRenter < countRenters.data.count
    }

    return renterResponse
  }
}

export { ListRenterUseCase }