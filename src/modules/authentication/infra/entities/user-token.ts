import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./user"

@Entity("user_tokens")
class UserToken {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column("varchar", { name: "refresh_token", nullable: false })
  refreshToken: string

  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userId?: string

  @Column({ name: 'expires_date', type: "timestamp", nullable: true })
  expiresDate: Date

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date
}

export { UserToken }
