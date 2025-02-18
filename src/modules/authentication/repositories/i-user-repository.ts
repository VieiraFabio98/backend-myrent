import { HttpResponse } from "@shared/helpers"
import { IUserDTO } from "../dto/i-user-dto"

interface IUserRepository {
  create(data: IUserDTO): Promise<HttpResponse>
}

export { IUserRepository }