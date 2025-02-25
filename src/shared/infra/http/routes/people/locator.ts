import { GetLocatorController } from '@modules/people/use-cases/locator/get-locator/get-locator-controller'
import { Router } from 'express'

const locatorRoutes = Router()
const getLocatorController = new GetLocatorController()

locatorRoutes.get('/:id', getLocatorController.handle)

export {  locatorRoutes }