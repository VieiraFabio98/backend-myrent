import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetRenterUseCase } from "./get-renter-use-case";


class GetRenterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const getRenterUseCase = container.resolve(GetRenterUseCase)

    const result = await getRenterUseCase.execute(id)
    .then(renterResult => {
      return renterResult
    }).catch(error => {
      return error
    })

    return response.status(result.statusCode).json(result)
  }
}

export { GetRenterController }