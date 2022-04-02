import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Product } from '@App/Product/Application/product.gql'
import { TopCategory } from '@App/TopCategory/Application/TopCategory.gql'

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string

  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => Product)
  product: Product

  @Field(() => TopCategory, { nullable: true })
  topCategory?: TopCategory
}
