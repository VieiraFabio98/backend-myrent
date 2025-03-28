import { inject, injectable } from "tsyringe";
import AppDataSource from "@shared/infra/database/data-source";
import { HttpResponse, serverError } from "@shared/helpers";
import { IHouseRepository } from "@modules/houses/repositories/i-house-repository";
import { query } from "express";

interface IRequest {
  locatorId: string
  address: string
  complement: string
  stateId: string
  cityId: string
  zipCode: string
  type: string
  totalArea: string
  usefulArea: string
  rooms: string
  bathrooms: string
  parkingSpaces: string
  rentValue: number
  condoValue: number
  status: string
  description: string
}

@injectable()
class CreateHouseUseCase {
  constructor(
    @inject('HouseRepository')
    private houseRepository: IHouseRepository
  ){}

  async execute({
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
  }: IRequest): Promise<HttpResponse>{
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const result = await this.houseRepository.create({
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
      }, queryRunner)

      await queryRunner.commitTransaction()

      return result
      
    } catch (error) {
      queryRunner.rollbackTransaction()
      throw serverError(error as Error)
    } finally {
      queryRunner.release()
    }

  }
}

export { CreateHouseUseCase }