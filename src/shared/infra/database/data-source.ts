import { DataSource } from 'typeorm'
import { getConfig } from './config'

const appDataSource = new DataSource(getConfig())
appDataSource.initialize()
export default appDataSource

// import "reflect-metadata"
// import { DataSource } from "typeorm"
// import dotenv from "dotenv"

// dotenv.config()

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: "localhost",
//   port: Number(process.env.PORT),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   synchronize: false, // Para ambiente de desenvolvimento (não use em produção)
//   logging: false,
//   entities: ["src/modules/**/infra/entities/*.ts"],
//   migrations: ["src/shared/infra/database/migrations/**/*.ts"],
//   subscribers: [],
// })

// export const initializeDatabase = async () => {
//   try {
//     await AppDataSource.initialize()
//     console.log("Banco de dados conectado! 🚀")
//   } catch (error) {
//     console.error("Erro ao conectar no banco", error)
//     process.exit(1) // Encerra a aplicação se o banco não conectar
//   }
// }
