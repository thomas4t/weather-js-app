import { Result } from '@Common/pagination/classicPagination'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string
}

@ObjectType()
export class OrderPlacedStatus {
  @Field(() => String)
  status: string
}

@ObjectType()
export class OrderResult extends Result<Order> {
  @Field(() => [Order])
  results: Order[]
}
