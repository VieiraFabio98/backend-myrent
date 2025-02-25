import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetLocatorUseCase } from "./get-locator-use-case";


class GetLocatorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id

    const getLocatorUseCase = container.resolve(GetLocatorUseCase)
    const result = await getLocatorUseCase.execute(id)
     
    return response.status(result.statusCode).json(result)
  }
}

export { GetLocatorController }