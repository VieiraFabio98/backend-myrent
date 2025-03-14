import { HttpResponse } from "@shared/helpers"
import { ILocatorDTO } from "../dto/locator"
import { QueryRunner } from "typeorm"
import { Locator } from "../infra/entities/locator"


interface ILocatorRepository {
  create(data: ILocatorDTO, queryRunner?: QueryRunner): Promise<HttpResponse>

  get(id: string): Promise<HttpResponse>

  update(data: ILocatorDTO): Promise<HttpResponse>

  delete(id: string): Promise<HttpResponse>

  findByUserId(userId: string): Promise<Locator>

}

export { ILocatorRepository }