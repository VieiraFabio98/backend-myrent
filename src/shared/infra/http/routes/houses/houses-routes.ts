import { CreateHouseController } from "@modules/houses/use-cases/houses/create-house/create-house-controller"
import { ListHouseController } from "@modules/houses/use-cases/houses/list-house/list-house-controller"
import { Router } from "express"


const housesRoutes = Router()

const createHouseController = new CreateHouseController()
const listHouseController = new ListHouseController()

housesRoutes.post('/', createHouseController.handle)
housesRoutes.post('/list/:locatorId', listHouseController.handle)

export { housesRoutes }