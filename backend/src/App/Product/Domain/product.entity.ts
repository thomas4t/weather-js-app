import { Column, Entity, OneToMany, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm'
import { ProductTag } from '@App/ProductTag/Domain/productTag.entity'
import { Category } from '@App/Category/Domain/category.entity'

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description?: string

  @Column({ type: 'int' })
  availableCount?: number

  @OneToMany(() => Category, (category) => category.product, { eager: true })
  categories: Category[]

  @ManyToMany(() => ProductTag)
  @JoinTable()
  productTags: ProductTag[]

  constructor(name?: string, description?: string, availableCount?: number) {
    this.name = name || ''
    this.description = description || ''
    this.availableCount = availableCount || NaN
  }
}
