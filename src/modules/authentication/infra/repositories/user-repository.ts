import { IUserDTO } from "@modules/authentication/dto/i-user-dto";
import { IUserRepository } from "@modules/authentication/repositories/i-user-repository";
import { HttpResponse, ok, serverError } from "@shared/helpers";
import { Repository } from "typeorm";
import AppDataSource from "@shared/infra/database/data-source";
import { User } from "@modules/authentication/infra/entities/user";


class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }

  async create({
    login,
    password,
    isAdmin,
    status
  }: IUserDTO): Promise<HttpResponse> {

    try {
      const user = this.repository.create({
        login,
        password,
        isAdmin,
        status
      })

      const result = await this.repository.save(user)

      return ok(result)

    } catch(error){
      return serverError(error as Error)
    } 
  }

  async findByLogin(login: string): Promise<User> {
    const user = await this.repository.findOne({ where: { login: login } })

    if (!user) {
      throw new Error('User not found')
    }
    return user
  }

  async delete(id: string): Promise<void>{
    try {
      await this.repository.delete(id)
    } catch(error){
      throw error
    }
  }
}

export { UserRepository }