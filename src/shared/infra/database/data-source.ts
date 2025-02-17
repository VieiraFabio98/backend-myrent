import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "myrent_user",
  password: "123456",
  database: "myrent_db",
  synchronize: false, // Para ambiente de desenvolvimento (não use em produção)
  logging: false,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/database/migrations/**/*.ts"],
  subscribers: [],
})

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize()
    console.log("Banco de dados conectado! 🚀")
  } catch (error) {
    console.error("Erro ao conectar no banco", error)
    process.exit(1) // Encerra a aplicação se o banco não conectar
  }
}
