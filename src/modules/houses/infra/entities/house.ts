import { Locator } from "@modules/people/infra/entities/locator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('houses')
class House {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => Locator, { nullable: false, eager: true })
  @JoinColumn({ name: 'locator_id', referencedColumnName: 'id' })
  locatorId: string

  @Column("varchar", { name: "name", nullable: false })
  address: string

  @Column("varchar", { name: "complement", nullable: true })
  complement?: string

  @Column("varchar", { name: "state_id", nullable: false })
  stateId: string

  @Column("varchar", { name: "city_id", nullable: false })
  cityId: string

  @Column("varchar", { name: "zip_code", nullable: false })
  zipCode: string

  @Column("varchar", { name: "type", nullable: false })
  type: string

  @Column("varchar", { name: "total_area", nullable: false })
  totalArea: string

  @Column("varchar", { name: "useful_area", nullable: false })
  usefulArea: string

  @Column("varchar", { name: "rooms", nullable: false })
  rooms: string

  @Column("varchar", { name: "bathrooms", nullable: false })
  bathrooms: string

  @Column("varchar", { name: "parking_spaces", nullable: false })
  parkingSpaces: string

  @Column("decimal", { name: "rent_value", nullable: false })
  rentValue: number

  @Column("decimal", { name: "condo_value", nullable: false })
  condoValue: number

  @Column("string", { name: "status", nullable: false })
  status: string

  @Column("varchar", { name: "description", nullable: true })
  description: string

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date
  
  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date

}

export { House }
