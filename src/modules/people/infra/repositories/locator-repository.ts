import { ILocatorDTO } from "@modules/people/dto/locator";
import { ILocatorRepository } from "@modules/people/repositories/i-locator-repository";
import { HttpResponse, serverError, ok } from "@shared/helpers";
import { Locator } from "@modules/people/infra/entities/locator";
import { Repository } from "typeorm";
import AppDataSource from "@shared/infra/database/data-source";


class LocatorRepository implements ILocatorRepository {
  private repository: Repository<Locator>

  constructor() {
    this.repository = AppDataSource.getRepository(Locator)
  }
  async create({
    userId,
    name,
    email,
    phone,
    mobilePhone,
    address,
    complement,
    status
  }: ILocatorDTO): Promise<HttpResponse> {
    try {
      const locator = this.repository.create({
        userId,
        name,
        email,
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
  
}

export { LocatorRepository }