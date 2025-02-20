import { IUserDTO } from "@modules/authentication/dto/i-user-dto";
import { IUserRepository } from "@modules/authentication/repositories/i-user-repository";
import { inject, injectable } from "tsyringe";
import { hash } from 'bcrypt'
import { User } from "@modules/authentication/infra/entities/user";
import { HttpResponse, unprocessableEntity } from "@shared/helpers";

interface IRequest {
  login: string
  password: string
  isAdmin: boolean
  status: boolean
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({
    login,
    password,
    isAdmin,
    status
  }: IRequest): Promise<User> {

    const userAlreadyExists = await this.userRepository.findByLogin(login)
    if(userAlreadyExists) {
      throw unprocessableEntity('User already exists')
    }

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

    return result
  }
}

export { CreateUserUseCase }