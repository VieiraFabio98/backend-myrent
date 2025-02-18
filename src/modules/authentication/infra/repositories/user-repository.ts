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

    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const user = this.repository.create({
        login,
        password,
        isAdmin,
        status
      })

      const result = await queryRunner.manager.save(user)
      await queryRunner.commitTransaction()

      return ok(result)

    } catch(error){
      await queryRunner.rollbackTransaction()
      return serverError(error as Error)
    } finally {
      await queryRunner.release()
    }
  }
}

export { UserRepository }