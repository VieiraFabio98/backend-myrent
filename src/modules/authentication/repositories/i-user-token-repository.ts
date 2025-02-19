import { HttpResponse } from "@shared/helpers"
import { IUserTokenDTO } from "../dto/i-user-token-dto"
import { UserToken } from "../infra/entities/user-token"

interface IUserTokenRepository {
  create({expiresDate,refreshToken,userId,}: IUserTokenDTO): Promise<UserToken | HttpResponse>

}

export { IUserTokenRepository }