import { HttpResponse } from "@shared/helpers"
import { IUserDTO } from "../dto/i-user-dto"
import { User } from "../infra/entities/user"

interface IUserRepository {
  create(data: IUserDTO): Promise<HttpResponse>

  findByLogin(login: string): Promise<User>
}

export { IUserRepository }