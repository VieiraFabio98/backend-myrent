import { HttpResponse } from "@shared/helpers";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateRenterUseCase } from "./update-renter-use-case";


class UpdateRenterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      locatorId, 
      name, 
      email, 
      phone, 
      mobilePhone, 
      status 
    } = request.body
    const { id } = request.params

    const updateRenterUseCase = container.resolve(UpdateRenterUseCase)

    const result = await updateRenterUseCase.execute({
      id,
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

export { UpdateRenterController }