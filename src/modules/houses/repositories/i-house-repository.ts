import { HttpResponse } from "@shared/helpers"
import { IHouseDTO } from "../dto/i-house-dto"
import { QueryRunner } from "typeorm"

interface IHouseRepository {
  create(data: IHouseDTO, queryRunner: QueryRunner): Promise<HttpResponse>

  listByLocatorId (
    locatorId: string,
    search: string,
    page: number,
    rowsPerPage: number,
    order: string,
    filter?: string,
  ): Promise<HttpResponse>

  count (search: string, filter?: string): Promise<HttpResponse>
}

export { IHouseRepository }