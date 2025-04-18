import { CreateRenterController } from '@modules/people/use-cases/renter/create-renter/create-renter-controller'
import { DeleteRenterController } from '@modules/people/use-cases/renter/delete-renter/delete-renter-controller'
import { GetRenterController } from '@modules/people/use-cases/renter/get-renter/get-renter-controller'
import { ListRenterController } from '@modules/people/use-cases/renter/list-renter/list-renter-controller'
import { UpdateRenterController } from '@modules/people/use-cases/renter/update-renter/update-renter-controller'
import { Router } from 'express'

const renterRoutes = Router()
const createRenterController = new CreateRenterController()
const updateRenterController = new UpdateRenterController()
const getRenterController = new GetRenterController()
const deleteRenterController = new DeleteRenterController()
const listRenterController = new ListRenterController()

renterRoutes.post('/', createRenterController.handle)
renterRoutes.post('/list/:locatorId', listRenterController.handle)
renterRoutes.put('/:id', updateRenterController.handle)
renterRoutes.get('/:id', getRenterController.handle)
renterRoutes.delete('/:id', deleteRenterController.handle)

export {  renterRoutes }