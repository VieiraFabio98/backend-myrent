interface IUserDTO {
  id?: string
  login: string
  password: string
  isAdmin: boolean
  status: boolean
  createdAt?: Date
  updatedAt?: Date
}

export { IUserDTO }