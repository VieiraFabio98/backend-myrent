import { IUserRepository } from "@modules/authentication/repositories/i-user-repository";
import { inject, injectable } from "tsyringe";
import AppDataSource from "@shared/infra/database/data-source"


@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ){}

  async execute(id: string): Promise<void> {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const result = await this.userRepository.delete(id)
    
      return result

    } catch(err){
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
  }
}

export {  DeleteUserUseCase }