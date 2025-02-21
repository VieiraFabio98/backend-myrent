import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./create-locator-use-case";


class CreateLocatorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      userId, 
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
      userId,
      name,
      email,
      phone,
      mobilePhone,
      address,
      number,
      complement,
      status
    }).then(locatorResult => {
      return locatorResult
    }).catch(error => {
      return error
    })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateLocatorController }