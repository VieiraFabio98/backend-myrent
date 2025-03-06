import { DeleteLocatorController } from '@modules/people/use-cases/locator/delete-locator/delete-locator-controller'
import { GetLocatorController } from '@modules/people/use-cases/locator/get-locator/get-locator-controller'
import { UpdateLocatorController } from '@modules/people/use-cases/locator/update-locator/update-locator-controller'
import { Router } from 'express'

const locatorRoutes = Router()
const getLocatorController = new GetLocatorController()
const updateLocatorController = new UpdateLocatorController()
const deleteLocatorController = new DeleteLocatorController()

locatorRoutes.get('/:id', getLocatorController.handle)
locatorRoutes.put('/:id', updateLocatorController.handle)
locatorRoutes.delete('/:id', deleteLocatorController.handle)

export {  locatorRoutes }