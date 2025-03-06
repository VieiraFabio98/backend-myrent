import { HttpResponse } from "@shared/helpers";
import { IRenterDTO } from "../dto/renter";

interface IRenterRepository {
  create(data: IRenterDTO): Promise<HttpResponse>

  update(data: IRenterDTO): Promise<HttpResponse>

  get(id: string): Promise<HttpResponse>

  delete(id: string): Promise<HttpResponse>
}

export { IRenterRepository}