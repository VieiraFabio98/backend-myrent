import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListHouseUseCase } from "./list-house-use-case";


class ListHouseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const locatorId = request.params.locatorId as string;

    const listHouseUseCase = container.resolve(ListHouseUseCase)

    const renters = await listHouseUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string,
      locatorId: locatorId
    })

    return response.json(renters)
  }
}

export { ListHouseController }