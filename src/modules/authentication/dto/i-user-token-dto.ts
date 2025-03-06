interface IUserTokenDTO {
  userId: string
  expiresDate: Date
  refreshToken: string
  createdAt?: Date
  updatedAt?: Date
}

export { IUserTokenDTO }