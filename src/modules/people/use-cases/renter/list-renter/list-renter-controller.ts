import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRenterUseCase } from "./list-renter-use-case";


class ListRenterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listRenterUseCase = container.resolve(ListRenterUseCase)

    const renters = await listRenterUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(renters)
  }
}

export { ListRenterController }