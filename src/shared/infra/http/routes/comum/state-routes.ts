import { GetStateController } from "@modules/comum/use-cases/state/get-state/get-state-controller";
import { Router } from "express";


const stateRoutes = Router()

const getStateController = new GetStateController()

stateRoutes.get('/', getStateController.handle)

export { stateRoutes }