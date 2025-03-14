import { User } from "@modules/authentication/infra/entities/user"
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm"

@Entity("locators")
class Locator {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @OneToOne(() => User, { nullable: false, eager: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userId: string

  @Column("varchar", { name: "name", nullable: false })
  name: string

  @Column("varchar", { name: "phone", nullable: true })
  phone?: string

  @Column("varchar", { name: "mobile_phone", nullable: true })
  mobilePhone?: string

  @Column("varchar", { name: "address", nullable: true })
  address?: string

  @Column("varchar", { name: "complement", nullable: true })
  complement?: string

  @Column("boolean", { name: "status", nullable: false })
  status?: boolean

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date
}

export { Locator }
