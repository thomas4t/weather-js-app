import { ArgsType, Field, InputType, registerEnumType, ID, Int } from '@nestjs/graphql'
import { IsIn, IsOptional } from 'class-validator'
import { ConnectionArguments, SortOrder, StringFilter } from '@Common/pagination/relayPagination'

enum ProductSortField {
  id = 'id',
  name = 'name',
}

registerEnumType(ProductSortField, {
  name: 'ProductSortField',
  description: '',
})

@InputType()
class ProductSort {
  @Field(() => ProductSortField)
  readonly field: ProductSortField

  @Field(() => SortOrder)
  readonly order: SortOrder
}

@InputType()
class ProductFilter {
  @Field(() => StringFilter, { nullable: true })
  readonly name?: StringFilter
}

@ArgsType()
export class ProductConnectionArguments extends ConnectionArguments {
  @Field(() => [ProductFilter], { nullable: true })
  readonly filter?: ProductFilter[]

  @Field(() => [ProductSort], { nullable: true })
  readonly sort?: ProductSort[]
}

@InputType()
export class ProductSearchArguments {
  @Field(() => ID, { nullable: true })
  id: string
}

@InputType()
export class ProductInsertArguments {
  @IsOptional()
  @IsIn([1, 2, 3])
  @Field(() => Int, { defaultValue: 1 })
  availableCount: number

  @Field()
  name: string

  @Field()
  description?: string
}
