import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ProductTag {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name?: string
}
