import { ArgsType, Field, ObjectType } from '@nestjs/graphql'
import { StringFilter, SortOrder } from '../common'

type CommonFilter = {
  [key: string]: StringFilter | any
}

type CommonSort = {
  field: string
  order: SortOrder
}

@ArgsType()
export abstract class PaginationArguments {
  @Field({ nullable: true })
  limit?: number

  @Field({ nullable: true })
  offset?: number

  abstract readonly filter?: CommonFilter[] // will be overriden

  abstract readonly sort?: CommonSort[] // will be overriden
}

@ObjectType()
export abstract class Result<T> {
  abstract results: T[]

  @Field()
  count: number

  @Field()
  hasPreviousPage: boolean

  @Field()
  hasNextPage: boolean
}
