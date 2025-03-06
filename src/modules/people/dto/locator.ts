import { User } from "@modules/authentication/infra/entities/user"

interface ILocatorDTO {
  id?: string
  userId?: string
  name?: string
  email?: string
  phone?: string
  mobilePhone?: string
  address?: string
  number?: string
  complement?: string
  status?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export { ILocatorDTO }