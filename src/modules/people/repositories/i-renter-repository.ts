import { HttpResponse } from "@shared/helpers";
import { IRenterDTO } from "../dto/renter";
import { QueryRunner } from "typeorm";

interface IRenterRepository {
  create(data: IRenterDTO, queryRunner: QueryRunner): Promise<HttpResponse>

  update(data: IRenterDTO): Promise<HttpResponse>

  get(id: string): Promise<HttpResponse>

  delete(id: string): Promise<HttpResponse>

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

export { IRenterRepository}