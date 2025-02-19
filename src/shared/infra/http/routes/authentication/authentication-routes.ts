import { AuthenticateUserController } from "@modules/authentication/use-cases/authenticate-user/authenticate-user-controller";
import { Router } from "express";

const authenticateRoutes = Router()

const authenticateUserController = new AuthenticateUserController()

authenticateRoutes.post('/sessions', authenticateUserController.handle)

export { authenticateRoutes }