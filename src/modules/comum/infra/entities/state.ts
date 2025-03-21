import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('estados')
class State {
  @PrimaryGeneratedColumn("uuid")
  id?: string

  @Column("varchar", { name: "codigo_ibge", nullable: false })
  codigoIbge?: string

  @Column("varchar", { name: 'uf', nullable: true })
  uf?: string

  @Column("varchar", { name: 'nome_estado', nullable: true })
  nomeEstado?: string

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date
}

export { State }