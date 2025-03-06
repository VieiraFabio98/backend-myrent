import { CreateUserController } from '@modules/authentication/use-cases/create-user/create-user-controller'
import { DeleteUserController } from '@modules/authentication/use-cases/delete-user/delete-user-controller'
import { Router } from 'express'

const userRoutes = Router()
const createUserController = new CreateUserController()
const deleteUserController = new DeleteUserController()

userRoutes.post('/', createUserController.handle)
userRoutes.delete('/:id', deleteUserController.handle)

export {  userRoutes }