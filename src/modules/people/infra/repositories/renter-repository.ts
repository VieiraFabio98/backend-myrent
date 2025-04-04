import { Brackets, QueryRunner, Repository } from "typeorm";
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
  }: IRenterDTO, queryRunner: QueryRunner): Promise<HttpResponse> {
    try {
      const renter = this.repository.create({
        locatorId,
        name,
        email,
        phone,
        mobilePhone,
        status
      })
    
      const result = await queryRunner.manager.save(renter)
    
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
      let query = this.repository.createQueryBuilder('ren')
        .select([
          'ren.id as "id"',
          'ren.name as "name"',
          'ren.email as "email"',
          'ren.phone as "phone"',
          'ren.mobile_phone as "mobilePhone"',
        ])
        .where('ren.locator_id = :locatorId', { locatorId: locatorId })

      if (filter) {
        query = query
          .andWhere(filter)
      }

      const renters = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(ren.name AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .orderBy('ren.name', 'ASC')
        .getRawMany()

      return ok(renters)
    } catch (err) {
      return serverError(err as Error)
    }
  }

  async count (
    search: string,
    filter?: string
  ): Promise<HttpResponse> {
    try {
      let query = this.repository.createQueryBuilder('ren')
        .select([
          'ren.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const renters = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(ren.name AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: renters.length })
    } catch (err) {
      return serverError(err as Error)
    }
  }
}

export { RenterRepository }