import { HttpResponse } from "@shared/helpers"


interface ICityRepository {

  getAllByStateId(id: string): Promise<HttpResponse>

}

export { ICityRepository }