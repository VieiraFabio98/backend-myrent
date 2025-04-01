import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetCityUseCase } from './get-state-use-case'

class GetCityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const getCityUseCase = container.resolve(GetCityUseCase)
    const estado = await getCityUseCase.execute(id)

    return response.status(estado.statusCode).json(estado.data)
  }
}

export { GetCityController }
