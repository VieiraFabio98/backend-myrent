import { Router } from "express"
import { userRoutes } from "./security/user-routes"
import { authenticateRoutes } from './authentication/authentication-routes'
import { locatorRoutes } from "./people/locator"
import { renterRoutes } from "./people/renter"

const router = Router()

router.use(authenticateRoutes)
router.use("/users", userRoutes)
router.use("/locators", locatorRoutes)
router.use("/renters", renterRoutes)


export { router }