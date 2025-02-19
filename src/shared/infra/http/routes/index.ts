import { Router } from "express"
import { userRoutes } from "./security/user-routes"
import { authenticateRoutes } from './authentication/authentication-routes'

const router = Router()

router.use(authenticateRoutes)
router.use("/users", userRoutes)

export { router }