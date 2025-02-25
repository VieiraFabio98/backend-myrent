import { Router } from "express"
import { userRoutes } from "./security/user-routes"
import { authenticateRoutes } from './authentication/authentication-routes'
import { locatorRoutes } from "./people/locator"

const router = Router()

router.use(authenticateRoutes)
router.use("/users", userRoutes)
router.use("/locator", locatorRoutes)


export { router }