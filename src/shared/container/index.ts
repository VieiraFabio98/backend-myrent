import { UserRepository } from "@modules/authentication/infra/repositories/user-repository"
import { UserTokenRepository } from "@modules/authentication/infra/repositories/user-token-repository"
import { IUserRepository } from "@modules/authentication/repositories/i-user-repository"
import { IUserTokenRepository } from "@modules/authentication/repositories/i-user-token-repository"
import { container } from "tsyringe"
import '@shared/container/providers'
import { ILocatorRepository } from "@modules/people/repositories/i-locator-repository"
import { LocatorRepository } from "@modules/people/infra/repositories/locator-repository"
import { IRenterRepository } from "@modules/people/repositories/i-renter-repository"
import { RenterRepository } from "@modules/people/infra/repositories/renter-repository"
import { IStateRepository } from "@modules/comum/repositories/i-state-repository"
import { StateRepository } from "@modules/comum/infra/repositories/state-repository"
import { ICityRepository } from "@modules/comum/repositories/i-city-repository"
import { CityRepository } from "@modules/comum/infra/repositories/city-repository"
import { IHouseRepository } from "@modules/houses/repositories/i-house-repository"
import { HouseRepository } from "@modules/houses/infra/repositories/house-repository"

container.registerSingleton<IUserRepository>("UserRepository", UserRepository)
container.registerSingleton<IUserTokenRepository>("UserTokenRepository", UserTokenRepository)
container.registerSingleton<ILocatorRepository>("LocatorRepository", LocatorRepository)
container.registerSingleton<IRenterRepository>("RenterRepository", RenterRepository)
container.registerSingleton<IStateRepository>("StateRepository", StateRepository)
container.registerSingleton<ICityRepository>("CityRepository", CityRepository)
container.registerSingleton<IHouseRepository>("HouseRepository", HouseRepository)