import { HttpResponse } from "@shared/helpers"
import { IUserDTO } from "../dto/i-user-dto"
import { User } from "../infra/entities/user"
import { QueryRunner } from "typeorm"

interface IUserRepository {
  create(data: IUserDTO, queryRunner?: QueryRunner): Promise<HttpResponse>

  findByLogin(login: string): Promise<User>

  delete(id: string): Promise<void>
}

export { IUserRepository }