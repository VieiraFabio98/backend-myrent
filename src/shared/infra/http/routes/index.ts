import { Router } from "express"
import { userRoutes } from "./security/user-routes"

const router = Router()

router.use("/users", userRoutes)

export { router }