import { Locator } from "@modules/people/infra/entities/locator"
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm"

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column("varchar", { name: "login", nullable: false })
  login: string

  @Column("varchar", { name: "password", nullable: false })
  password: string

  @Column("boolean", { name: "is_admin", nullable: false })
  isAdmin: boolean

  @Column("boolean", { name: "status", nullable: false })
  status: boolean

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date

  // @OneToOne(() => Locator, locator => locator.userId, { 
  //   onDelete: 'CASCADE', 
  //   eager: true 
  // })
  // @JoinColumn({ name: "locator_id" }) // Define explicitamente a FK no User
  // locator: Locator

}

export { User }
