import express from "express"
// import { initializeDatabase } from "shared/infra/database/data-source"
import { initializeDatabase } from "@shared/infra/database/data-source"

const app = express()
const port = 3000

const startServer = async () => {
  await initializeDatabase() // Aguarda a conexão com o banco antes de iniciar o servidor

  app.get("/", (req, res) => {
    res.send("Hello World!")
  })

  app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`)
  })
}

startServer()
