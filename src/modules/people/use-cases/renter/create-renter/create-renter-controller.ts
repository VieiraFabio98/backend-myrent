import { HttpResponse } from "@shared/helpers";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRenterUseCase } from "./create-renter-use-case";


class CreateRenterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      locatorId, 
      name, 
      email, 
      phone, 
      mobilePhone, 
      status 
    } = request.body

    const createRenterUseCase = container.resolve(CreateRenterUseCase)

    const result = await createRenterUseCase.execute({
      locatorId,
      name,
      email,
      phone,
      mobilePhone,
      status
    }).then(renterResult => {
      return renterResult
    }).catch(error => {
      return error
    })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateRenterController }