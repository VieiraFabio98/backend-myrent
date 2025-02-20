import { User } from "@modules/authentication/infra/entities/user"
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"

@Entity("locators")
class Locator {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userId: string

  @Column("varchar", { name: "name", nullable: false })
  name: string

  @Column("varchar", { name: "email", nullable: false })
  email?: string

  @Column("string", { name: "phone", nullable: false })
  phone?: string

  @Column("string", { name: "mobile_phone", nullable: false })
  mobilePhone?: string

  @Column("string", { name: "address", nullable: false })
  address?: string

  @Column("string", { name: "complement", nullable: false })
  complement?: string

  @Column("boolean", { name: "status", nullable: false })
  status?: boolean

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date
}

export { Locator }
