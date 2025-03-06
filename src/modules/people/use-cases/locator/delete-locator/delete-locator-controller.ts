import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteLocatorUseCase } from "./delete-locator-use-case";


class DeleteLocatorController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteLocatorUseCase = container.resolve(DeleteLocatorUseCase)
    const result = await deleteLocatorUseCase.execute(id)
    .then(locatorResult => {
      return locatorResult
    }).catch(error => {
      return error
    })

    return response.status(result.statusCode).json(result)
  }
}

export { DeleteLocatorController}