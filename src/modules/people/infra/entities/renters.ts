import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Locator } from "./locator";

@Entity('renters')
class Renter {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => Locator, { nullable: false, eager: false })
  @JoinColumn({ name: 'locator_id', referencedColumnName: 'id' })
  locatorId: string

  @Column("varchar", { name: "name", nullable: true })
  name?: string

  @Column("varchar", { name: "email", nullable: true })
  email?: string

  @Column("varchar", { name: "phone", nullable: true })
  phone?: string
  
  @Column("varchar", { name: "mobile_phone", nullable: true })
  mobilePhone?: string

  @Column("boolean", { name: "status", nullable: false })
  status?: boolean
  
  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date
  
  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date
}

export { Renter}