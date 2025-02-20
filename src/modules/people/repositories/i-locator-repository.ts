import { HttpResponse } from "@shared/helpers"
import { ILocatorDTO } from "../dto/locator"


interface ILocatorRepository {
  create(data: ILocatorDTO): Promise<HttpResponse>

}

export { ILocatorRepository }