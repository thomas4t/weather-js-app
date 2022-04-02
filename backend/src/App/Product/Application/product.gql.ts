import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Connection, Edge } from '@Common/pagination/relayPagination'
import { ProductTag } from '@App/ProductTag/Application/productTag.gql'
import { Category } from '@App/Category/Application/category.gql'

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  availableCount?: number

  @Field(() => [Category])
  categories: Category[]

  @Field(() => [ProductTag])
  productTags: ProductTag[]
}

@ObjectType({ isAbstract: true })
class ProductListEdge extends Edge<Product> {
  @Field(() => Product)
  readonly node!: Product
}

@ObjectType()
export class ProductListConnection extends Connection<Product> {
  @Field(() => [ProductListEdge])
  readonly edges!: ProductListEdge[]
}
