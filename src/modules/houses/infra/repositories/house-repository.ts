import { IHouseDTO } from "@modules/houses/dto/i-house-dto";
import { IHouseRepository } from "@modules/houses/repositories/i-house-repository";
import { HttpResponse, ok, serverError } from "@shared/helpers";
import AppDataSource from "@shared/infra/database/data-source"
import { Brackets, QueryRunner, Repository } from "typeorm";
import { House } from "../entities/house";


class HouseRepository implements IHouseRepository {
  private repository: Repository<House>
  
  constructor() {
    this.repository = AppDataSource.getRepository(House)
  }
    
  async create({
    locatorId,
    address,
    complement,
    stateId,
    cityId,
    zipCode,
    type,
    totalArea,
    usefulArea,
    rooms,
    bathrooms,
    parkingSpaces,
    rentValue,
    condoValue,
    status,
    description
  }: IHouseDTO, queryRunner: QueryRunner): Promise<HttpResponse> {
    try {
      const House = this.repository.create({
        locatorId,
        address,
        complement,
        stateId,
        cityId,
        zipCode,
        type,
        totalArea,
        usefulArea,
        rooms,
        bathrooms,
        parkingSpaces,
        rentValue,
        condoValue,
        status,
        description
      })
      const result = await queryRunner.manager.save(House)
  
      return ok(result)
  
    } catch (err) {
      console.log(err)
      throw serverError(err as Error)
    }
  }

  async listByLocatorId (
      locatorId: string,
      search: string,
      page: number,
      rowsPerPage: number,
      order: string,
      filter?: string
    ): Promise<HttpResponse> {
      let columnName: string
      let columnDirection: 'ASC' | 'DESC'
  
      if ((typeof(order) === 'undefined') || (order === "")) {
        columnName = 'name'
        columnDirection = 'ASC'
      } else {
        columnName = order.substring(0, 1) === '-' ? order.substring(1) : order
        columnDirection = order.substring(0, 1) === '-' ? 'DESC' : 'ASC'
      }
  
      const referenceArray: string | string[] = []
      const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')
  
      const index = referenceArray.indexOf(columnName)
  
      columnOrder[index] = columnDirection
  
      const offset = rowsPerPage * page
      
      try {
        let query = this.repository.createQueryBuilder('hou')
          .select([
            'hou.id as "id"',
            'hou.address as "address"',
          ])
          .where('hou.locator_id = :locatorId', { locatorId: locatorId })
  
        if (filter) {
          query = query
            .andWhere(filter)
        }
  
        const houses = await query
          .andWhere(new Brackets(query => {
            query.andWhere('CAST(hou.address AS VARCHAR) ilike :search', { search: `%${search}%` })
          }))
          .offset(offset)
          .limit(rowsPerPage)
          .take(rowsPerPage)
          .orderBy('hou.address', 'ASC')
          .getRawMany()
  
        return ok(houses)
      } catch (err) {
        return serverError(err as Error)
      }
    }
  
    async count (
      search: string,
      filter?: string
    ): Promise<HttpResponse> {
      try {
        let query = this.repository.createQueryBuilder('hou')
          .select([
            'hou.id as "id"',
          ])
  
        if (filter) {
          query = query
            .where(filter)
        }
  
        const houses = await query
          .andWhere(new Brackets(query => {
            query.andWhere('CAST(hou.address AS VARCHAR) ilike :search', { search: `%${search}%` })
          }))
          .getRawMany()
  
        return ok({ count: houses.length })
      } catch (err) {
        return serverError(err as Error)
      }
    }


}

export { HouseRepository }