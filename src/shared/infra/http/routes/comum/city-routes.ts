import { GetCityController } from "@modules/comum/use-cases/city/get-city/get-state-controller";
import { GetStateController } from "@modules/comum/use-cases/state/get-state/get-state-controller";
import { Router } from "express";


const cityRoutes = Router()

const getCityController = new GetCityController()

cityRoutes.get('/:id', getCityController.handle)

export { cityRoutes }