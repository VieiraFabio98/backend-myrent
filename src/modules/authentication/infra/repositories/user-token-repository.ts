import { IUserTokenDTO } from "@modules/authentication/dto/i-user-token-dto";
import { IUserTokenRepository } from "@modules/authentication/repositories/i-user-token-repository";
import { HttpResponse, serverError } from "@shared/helpers";
import AppDataSource from "@shared/infra/database/data-source";
import { Repository } from "typeorm";
import { UserToken } from "@modules/authentication/infra/entities/user-token";


class UserTokenRepository implements IUserTokenRepository {
  private repository: Repository<UserToken>

  constructor() {
    this.repository = AppDataSource.getRepository(UserToken)
  }

  async create({
    expiresDate,
    refreshToken,
    userId,
  }: IUserTokenDTO): Promise<UserToken> {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const userToken = this.repository.create({
        expiresDate,
        refreshToken,
        userId,
      })

      console.log(userToken)
  
      await queryRunner.manager.save(userToken)
      await queryRunner.commitTransaction()
  
      return userToken
    } catch(error){
      await queryRunner.rollbackTransaction()
      throw serverError(error as Error)
    } finally {
      await queryRunner.release()
    }
  }
  
}

export { UserTokenRepository }