import { estados } from "./estados"
import { cidades } from "./cidades"
import { ceps } from "./ceps"

async function seeder() {
  await estados()
  await cidades()
  await ceps()
}

seeder()
