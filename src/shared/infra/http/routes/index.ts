import { Router } from "express"
import { userRoutes } from "./security/user-routes"
import { authenticateRoutes } from './authentication/authentication-routes'
import { locatorRoutes } from "./people/locator"
import { renterRoutes } from "./people/renter"
import { stateRoutes } from "./comum/state-routes"
import { cityRoutes } from "./comum/city-routes"

const router = Router()

router.use(authenticateRoutes)
router.use("/users", userRoutes)
router.use("/locators", locatorRoutes)
router.use("/renters", renterRoutes)
router.use("/state", stateRoutes)
router.use("/city", cityRoutes)


export { router }