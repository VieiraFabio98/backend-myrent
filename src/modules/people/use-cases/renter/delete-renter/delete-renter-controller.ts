import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteRenterUseCase } from "./delete-renter-use-case";


class DeleteRenterController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteRenterUseCase = container.resolve(DeleteRenterUseCase)

    const result = await deleteRenterUseCase.execute(id)
    .then(renterResult => {
      return renterResult
    }
    ).catch(error => {
      return error
    })

    return response.status(result.statusCode).json(result)
  }
}

export { DeleteRenterController }