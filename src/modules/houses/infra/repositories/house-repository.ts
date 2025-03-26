import { IHouseDTO } from "@modules/houses/dto/i-house-dto";
import { IHouseRepository } from "@modules/houses/repositories/i-house-repository";
import { HttpResponse, ok, serverError } from "@shared/helpers";
import AppDataSource from "@shared/infra/database/data-source"
import { QueryRunner, Repository } from "typeorm";
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

}

export { HouseRepository }