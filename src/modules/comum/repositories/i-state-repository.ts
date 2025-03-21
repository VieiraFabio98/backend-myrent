import { HttpResponse } from "@shared/helpers"


interface IStateRepository {

  getAll(): Promise<HttpResponse>

}

export { IStateRepository }