import { DataSourceOptions } from "typeorm"
import { config } from 'dotenv'

config()

export const getConfig = () => {
  return {
    type: "postgres",
    host: "localhost",
    port: Number(process.env.PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrations: ["src/shared/infra/database/migrations/**/*.ts"],
    // entities: [
    //   './src/modules/*/infra/typeorm/entities/.ts',
    //   './dist/modules/*/infra/typeorm/entities/.js'
    // ]
    entities: ["src/modules/**/infra/entities/*.ts"],
  } as DataSourceOptions
}