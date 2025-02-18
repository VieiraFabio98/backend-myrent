import { Request, Response } from 'express'
import { container } from "tsyringe";
import { CreateUserUseCase } from "./create-user-use-case";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { login, password, isAdmin, status } = request.body

    console.log(login, password, isAdmin, status)

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const result = await createUserUseCase.execute({
      login,
      password,
      isAdmin,
      status
    }).then(userResult => {
      return userResult
    })
    .catch(error => {
      return error
    })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateUserController }