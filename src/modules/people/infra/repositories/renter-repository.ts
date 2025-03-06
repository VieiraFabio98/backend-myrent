import { Repository } from "typeorm";
import { Renter } from "../entities/renters";
import AppDataSource from "@shared/infra/database/data-source"
import { IRenterRepository } from "@modules/people/repositories/i-renter-repository";
import { IRenterDTO } from "@modules/people/dto/renter";
import { HttpResponse, notFound, ok, serverError } from "@shared/helpers";


class RenterRepository implements IRenterRepository {
  private repository: Repository<Renter>

  constructor() {
    this.repository = AppDataSource.getRepository(Renter)
  }

  async create({
    locatorId,
    name,
    email,
    phone,
    mobilePhone,
    status
  }: IRenterDTO): Promise<HttpResponse> {
    try {
      const renter = this.repository.create({
        locatorId,
        name,
        email,
        phone,
        mobilePhone,
        status
      })
    
      const result = await this.repository.save(renter)
    
      return ok(result)
    
    } catch(err) {
        throw serverError(err as Error)
    }
  }

  async update({
    id,
    locatorId,
    name,
    email,
    phone,
    mobilePhone,
    status
  }: IRenterDTO): Promise<HttpResponse> {
    try {
      const renter = await this.repository.findOne({ where: { id: id } })

      if (!renter) {
        return notFound()
      }  

      const newRenter = this.repository.create({
        id,
        locatorId,
        name,
        email,
        phone,
        mobilePhone,
        status
      })
    
      const result = await this.repository.save(newRenter)
    
      return ok(result)
    
    } catch(err) {
      throw serverError(err as Error)
    }
  }

  async get(id: string): Promise<HttpResponse> {
    try {
      const renter = await this.repository.findOne({ where: { id: id } })

      if (!renter) {
        return notFound()
      }

      console.log(renter)

      return ok(renter)
    } catch(err) {
      throw serverError(err as Error)
    }
  }

  async delete(id: string): Promise<HttpResponse> {
    try {
      const renter = await this.repository.findOne({ where: { id: id } })

      if (!renter) {
        return notFound()
      }

      const result = await this.repository.delete(id)

      return ok(result)
    } catch(err) {
      throw serverError(err as Error)
    }
  }
}

export { RenterRepository }