interface IHouseDTO {
  id?: string
  locatorId?: string
  address?: string
  complement?: string
  stateId?: string
  cityId?: string
  zipCode?: string
  type?: string
  totalArea?: string
  usefulArea?: string
  rooms?: string
  bathrooms?: string
  parkingSpaces?: string
  rentValue?: number
  condoValue?: number
  status?: string
  description?: string
  createdAt?: Date
  updatedAt?: Date
}

export { IHouseDTO }