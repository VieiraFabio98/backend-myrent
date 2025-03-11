import { ILocatorDTO } from "@modules/people/dto/locator";
import { ILocatorRepository } from "@modules/people/repositories/i-locator-repository";
import { HttpResponse, serverError, ok, noContent } from "@shared/helpers";
import { Locator } from "@modules/people/infra/entities/locator";
import { Repository } from "typeorm";
import AppDataSource from "@shared/infra/database/data-source";
import { QueryRunner } from "typeorm/browser";


class LocatorRepository implements ILocatorRepository {
  private repository: Repository<Locator>

  constructor() {
    this.repository = AppDataSource.getRepository(Locator)
  }
  
  async create({
    userId,
    name,
    phone,
    mobilePhone,
    address,
    complement,
    status
  }: ILocatorDTO, queryRunner: QueryRunner): Promise<HttpResponse> {
    try {
      const locator = this.repository.create({
        userId,
        name,
        phone,
        mobilePhone,
        address,
        complement,
        status
      })
      const result = await queryRunner.manager.save(locator)

      return ok(result)

    } catch (err) {
      console.log(err)
      throw serverError(err as Error)
    }
  }

  async get(id: string): Promise<HttpResponse> {
    try {
      const locator = await this.repository.findOne({ where: { id: id }})
  
      if(!locator) {
        return noContent()
      }

      return ok(locator)
    } catch(err) {
      throw serverError(err as Error)
    }
  }

  async update({
    id,
    name,
    phone,
    mobilePhone,
    address,
    complement,
    status
  }: ILocatorDTO): Promise<HttpResponse> {
    try {
      const locator = this.repository.create({
        id,
        name,
        phone,
        mobilePhone,
        address,
        complement,
        status
      })

      const result = await this.repository.save(locator)

      return ok(result)

    } catch (err) {
      throw serverError(err as Error)
    }
  }

  async delete(id: string): Promise<HttpResponse> {
    try {
      const result = await this.repository.delete(id)

      return ok(result)

    } catch (err) {
      throw serverError(err as Error)
    }
  }
  
}

export { LocatorRepository }