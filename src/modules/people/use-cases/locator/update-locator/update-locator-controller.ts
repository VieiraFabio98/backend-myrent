import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateLocatorUseCase } from "./update-locator-use-case";


class UpdateLocatorController {
  async handle(request: Request, response: Response) {
    const { id } = request.params
    const {
      name,
      email,
      phone,
      mobilePhone,
      address,
      number,
      complement,
      status
    } = request.body

    const updateLocatorUseCase = container.resolve(UpdateLocatorUseCase)

    const result = await updateLocatorUseCase.execute({
      id,
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

export { UpdateLocatorController }