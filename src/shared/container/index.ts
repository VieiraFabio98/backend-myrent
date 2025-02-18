import { UserRepository } from "@modules/authentication/infra/repositories/user-repository"
import { IUserRepository } from "@modules/authentication/repositories/i-user-repository"
import { container } from "tsyringe"

container.registerSingleton<IUserRepository>("UserRepository", UserRepository)