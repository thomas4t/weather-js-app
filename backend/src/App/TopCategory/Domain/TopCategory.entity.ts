import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class TopCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  title?: string
}
