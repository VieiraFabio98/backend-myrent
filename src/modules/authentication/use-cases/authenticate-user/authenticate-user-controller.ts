import { container } from "tsyringe"
import { AuthenticateUserUseCase } from "./authenticate-user-use-case"
import { Request, Response } from 'express'


class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { login, password } = request.body

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

    const token = await authenticateUserUseCase.execute({
      password,
      login
    })

    return response.json(token)
    
  }
}

export { AuthenticateUserController }