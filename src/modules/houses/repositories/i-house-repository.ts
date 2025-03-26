import { HttpResponse } from "@shared/helpers"
import { IHouseDTO } from "../dto/i-house-dto"
import { QueryRunner } from "typeorm"

interface IHouseRepository {
  create(data: IHouseDTO, queryRunner: QueryRunner): Promise<HttpResponse>
}

export { IHouseRepository }