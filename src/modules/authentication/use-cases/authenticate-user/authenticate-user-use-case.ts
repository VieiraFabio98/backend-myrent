import { IUserRepository } from "@modules/authentication/repositories/i-user-repository";
import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt"
import auth from '@config/auth'
import { sign } from 'jsonwebtoken'
import { IDateProvider } from "@shared/container/providers/date-provider/i-date-provider";
import { IUserTokenRepository } from "@modules/authentication/repositories/i-user-token-repository";

interface IRequest {
  login: string
  password: string
}

interface IResponse {
  user: {
    login: string
  }
  token: string
  refreshToken: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository
  ){}

  async execute({ login, password }: IRequest): Promise<IResponse> {
    const {
      expires_in_token,
      secret_refresh_token,
      secret_token,
      expires_in_refreshToken,
      expires_refreshToken_days,
    } = auth

    const user = await this.userRepository.findByLogin(login)
    if (!user) {
      throw new Error("Email ou senha incorretos")
    }

    const decodedPassword = atob(password)

    const passwordMatch = await compare(decodedPassword, user.password)
    if(!passwordMatch) {
      throw new Error("Email ou senha incorretos")
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token
    })

    const refreshToken = sign({ login }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refreshToken
    })

    const refreshTokenExpiresDate = this.dateProvider.addDays(expires_refreshToken_days)

    await this.userTokenRepository.create({
      userId: user.id,
      refreshToken,
      expiresDate: refreshTokenExpiresDate
    })

    const tokenReturn: IResponse = {
      user: {
        login: user.login,
      },
      token,
      refreshToken
    }

    return tokenReturn

  }
}

export { AuthenticateUserUseCase }