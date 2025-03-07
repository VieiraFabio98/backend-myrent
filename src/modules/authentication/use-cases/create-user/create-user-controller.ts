import { Request, Response } from 'express'
import { container } from "tsyringe";
import { CreateUserUseCase } from "./create-user-use-case";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      login, 
      password, 
      isAdmin,
      name,
      email,
      phone,
      mobilePhone,
      address,
      number,
      complement,
      status 
    } = request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const result = await createUserUseCase.execute({
      login, 
      password, 
      isAdmin: false,
      name,
      email,
      phone,
      mobilePhone,
      address,
      number,
      complement,
      status: true 
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