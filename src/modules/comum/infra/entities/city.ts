import { Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { State } from './state'


@Entity('cidades')
class City {
  @PrimaryGeneratedColumn("uuid")
  id?: string

  @ManyToOne(() => State, { nullable: true, eager: true })
  @JoinColumn({ name: 'estado_id', referencedColumnName: 'id' })
  estadoId?: string

  @Column("varchar", { name: 'codigo_ibge', nullable: true })
  codigoIbge?: string

  @Column("varchar", { name: 'nome_cidade', nullable: true })
  nomeCidade?: string

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date
}

export { City }