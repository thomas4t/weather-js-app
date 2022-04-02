import { Field, InputType, ID, ArgsType, registerEnumType } from '@nestjs/graphql'
import { PaginationArguments, SortOrder, StringFilter } from '@Common/pagination/classicPagination'

enum OrderSortField {
  id = 'id',
  name = 'name',
}

registerEnumType(OrderSortField, {
  name: 'OrderSortField',
  description: '',
})

@InputType()
class OrderSort {
  @Field(() => OrderSortField)
  readonly field: OrderSortField

  @Field(() => SortOrder)
  readonly order: SortOrder
}

@InputType()
class OrderFilter {
  @Field(() => StringFilter, { nullable: true })
  readonly name?: StringFilter
}

@ArgsType()
export class ProductPaginationArguments extends PaginationArguments {
  @Field(() => [OrderFilter], { nullable: true })
  readonly filter?: OrderFilter[]

  @Field(() => [OrderSort], { nullable: true })
  readonly sort?: OrderSort[]
}

@InputType()
export class OrderPlaceArguments {
  @Field(() => ID, { nullable: true })
  id: string
}
