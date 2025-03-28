import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateHouseUseCase } from "./create-house-use-case";

class CreateHouseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      locatorId, 
      name, 
      address, 
      complement, 
      stateId, 
      cityId, 
      zipCode, 
      type, 
      totalArea, 
      usefulArea, 
      rooms, 
      bathrooms, 
      parkingSpaces, 
      rentValue, 
      condoValue, 
      status, 
      description 
    } = request.body

    const createHouseUseCase = container.resolve(CreateHouseUseCase);

    
    const result = await createHouseUseCase.execute({
      locatorId,
      name,
      address,
      complement,
      stateId,
      cityId,
        zipCode,
        type,
        totalArea,
        usefulArea,
        rooms,
        bathrooms,
        parkingSpaces,
        rentValue,
        condoValue,
        status,
        description
      })

      return response.status(201).json(result);
    
  }
}

export { CreateHouseController };