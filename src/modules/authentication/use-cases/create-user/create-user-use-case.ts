import { IUserDTO } from "@modules/authentication/dto/i-user-dto";
import { IUserRepository } from "@modules/authentication/repositories/i-user-repository";
import { inject, injectable } from "tsyringe";
import { hash } from 'bcrypt'
import { User } from "@modules/authentication/infra/entities/user";
import { HttpResponse, unprocessableEntity } from "@shared/helpers";
import { ILocatorRepository } from "@modules/people/repositories/i-locator-repository";

interface IRequest {
  login: string
  password: string
  isAdmin: boolean
  name: string
  email?: string
  phone?: string
  mobilePhone?: string
  address?: string
  number?: string
  complement?: string
  status: boolean
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('LocatorRepository')
    private locatorRepository: ILocatorRepository
  ) {}

  async execute({
    login,
    password,
    isAdmin,
    name,
    email,
    phone,
    mobilePhone,
    address,
    number,
    complement,
    status
  }: IRequest): Promise<User> {

    // const userAlreadyExists = await this.userRepository.findByLogin(login)
    // console.log(userAlreadyExists, 'aqui')
    // if(userAlreadyExists) {
    //   throw unprocessableEntity('User already exists')
    // }

    const passwordHash = await hash(password, 8)

    const result = await this.userRepository.create({
      login,
      password: passwordHash,
      isAdmin,
      status
    }).then(userResult => {
      return userResult
    })
    .catch(error => {
      return error
    })

    const locator = await this.locatorRepository.create({
      userId: result.data.id,
      name: name,
      email: email,
      phone: phone,
      mobilePhone: mobilePhone,
      address: address,
      number: number,
      complement: complement,
      status: status
    })

    result.data.locator = locator.data

    return result
  }
}

export { CreateUserUseCase }