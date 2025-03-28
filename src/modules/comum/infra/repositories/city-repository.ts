import { ICityRepository } from "@modules/comum/repositories/i-city-repository"
import { HttpResponse, ok, serverError } from "@shared/helpers"
import AppDataSource from "@shared/infra/database/data-source"
import { City } from "../entities/city"
import { Repository } from "typeorm"


class CityRepository implements ICityRepository {

  private repository: Repository<City>

  constructor() {
    this.repository = AppDataSource.getRepository(City)
  }

  async getAllByStateId(id: string): Promise<HttpResponse> {
    try {
      const city = await this.repository.createQueryBuilder('cit')
        .select([
          'cit.id as "id"',
          'cit.codigoIbge as "codigoIbge"',
          'cit.nomeCidade as "nome"',
        ])
        .where('cit.estadoId = :id', { id })
        .orderBy('cit.nomeCidade')
        .getRawMany()
      return ok(city)
    } catch(err){
      return serverError(err as Error)
    }
  }
  
}

export { CityRepository }