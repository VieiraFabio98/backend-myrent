import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

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
}

export { User }
