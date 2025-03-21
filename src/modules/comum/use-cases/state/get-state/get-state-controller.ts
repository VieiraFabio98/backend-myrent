import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetStateUseCase } from './get-state-use-case'

class GetStateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getstateUseCase = container.resolve(GetStateUseCase)
    const estado = await getstateUseCase.execute()

    return response.status(estado.statusCode).json(estado.data)
  }
}

export { GetStateController }
