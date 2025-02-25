import { HttpResponse } from "@shared/helpers"
import { ILocatorDTO } from "../dto/locator"
import { QueryRunner } from "typeorm"


interface ILocatorRepository {
  create(data: ILocatorDTO, queryRunner?: QueryRunner): Promise<HttpResponse>

  get(id: string): Promise<HttpResponse>

}

export { ILocatorRepository }