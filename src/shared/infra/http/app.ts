import 'reflect-metadata'
import 'dotenv/config'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import '@shared/container'
import { router } from './routes'

const app = express()

// @ts-ignore
app.use(express.json( { limit: '250mb' } ))

const options: cors.CorsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}

app.use(cors(options))

app.use(router)

export { app }



// import express, { Router } from "express"
// import { initializeDatabase } from "@shared/infra/database/data-source"
// import cors from 'cors'
// import 'express-async-errors'

// const app = express()
// const port = 3000
// const router = Router()

// const startServer = async () => {
//   await initializeDatabase() 

//   const allowedOrigins = '*'

//   const options: cors.CorsOptions = {
//     origin: allowedOrigins,
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//   }

//   // @ts-ignore
//   // app.use(Sentry.Handlers.requestHandler())

//   // // @ts-ignore
//   // app.use(Sentry.Handlers.tracingHandler())

//   // @ts-ignore
//   app.use(express.json())

//   app.use(cors(options))

//   app.use(router)

//   app.listen(port, () => {
//     console.log(`🚀 Servidor rodando na porta ${port}`)
//   })
// }

// startServer()
