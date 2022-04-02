import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  public constructor(id: string) {
    this.id = id
  }
}
