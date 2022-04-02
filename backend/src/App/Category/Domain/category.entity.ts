import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm'
import { Product } from '@App/Product/Domain/product.entity'
import { TopCategory } from '@App/TopCategory/Domain/TopCategory.entity'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  title: string

  @ManyToOne(() => Product, (product) => product.categories)
  product: Product

  @OneToOne(() => TopCategory, { eager: true })
  @JoinColumn()
  topCategory?: TopCategory
}
