import { IHouseDTO } from "@modules/houses/dto/i-house-dto";
import { IHouseRepository } from "@modules/houses/repositories/i-house-repository";
import { IRenterRepository } from "@modules/people/repositories/i-renter-repository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string,
  locatorId: string
}

interface IResponse {
  items: IHouseDTO[],
  hasNext: boolean
}

@injectable()
class ListHouseUseCase {
  constructor(
    @inject('HouseRepository')
    private houseRepository: IHouseRepository
  ){}

  async execute({
    locatorId,
    search = '',
    page = 0,
    rowsPerPage = 10,
    order = '',
    filter, 
  }: IRequest): Promise<IResponse>{
    const newPage = page !== 0 ? page - 1 : 0

    const houses = await this.houseRepository.listByLocatorId(
      locatorId,
      search,
      newPage,
      rowsPerPage,
      order,
      filter,
    )

    const countHouses = await this.houseRepository.count(search, filter)
    
    const numberRenter = page * rowsPerPage

    const houseResponse = {
      items: houses.data,
      hasNext: numberRenter < countHouses.data.count
    }

    return houseResponse
  }
}

export { ListHouseUseCase }