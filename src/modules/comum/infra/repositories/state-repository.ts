import { IStateRepository } from "@modules/comum/repositories/i-state-repository"
import { HttpResponse, ok, serverError } from "@shared/helpers"
import { Repository } from "typeorm"
import { State } from "../entities/state"
import AppDataSource from "@shared/infra/database/data-source"



class StateRepository implements IStateRepository {

  private repository: Repository<State>

  constructor() {
    this.repository = AppDataSource.getRepository(State)
  }

  async getAll(): Promise<HttpResponse> {
    try {
      const state = await this.repository.createQueryBuilder('sta')
        .select([
          'sta.id as "id"',
          'sta.codigoIbge as "codigoIbge"',
          'sta.uf as "uf"',
          'sta.nomeEstado as "nomeEstado"',
        ])
        .orderBy('sta.nomeEstado')
        .getRawMany()

      return ok(state)
    } catch(err){
      return serverError(err as Error)
    }
  }

}

export { StateRepository }