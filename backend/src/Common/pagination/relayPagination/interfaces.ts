import { ArgsType, Field, ObjectType, ID, InterfaceType } from '@nestjs/graphql'
import * as Relay from 'graphql-relay'
import { StringFilter, SortOrder } from '../common'

@InterfaceType()
export abstract class Node {
  @Field(() => ID)
  id!: string
}

@ObjectType()
export class PageInfo implements Relay.PageInfo {
  @Field(() => Boolean, { nullable: true })
  hasNextPage: boolean

  @Field(() => Boolean, { nullable: true })
  hasPreviousPage: boolean

  @Field(() => String, { nullable: true })
  startCursor: Relay.ConnectionCursor

  @Field(() => String, { nullable: true })
  endCursor: Relay.ConnectionCursor
}

@ObjectType({ isAbstract: true })
export abstract class Edge<T> implements Relay.Edge<T> {
  @Field()
  readonly cursor!: Relay.ConnectionCursor

  abstract readonly node: T
}

@ObjectType()
export abstract class Connection<T> implements Relay.Connection<T> {
  @Field()
  readonly pageInfo!: PageInfo

  @Field()
  readonly totalCount: number

  abstract readonly edges: Edge<T>[]
}

type CommonFilter = {
  [key: string]: StringFilter | any
}

type CommonSort = {
  field: string
  order: SortOrder
}

@ArgsType()
export abstract class ConnectionArguments implements Relay.ConnectionArguments {
  @Field({ nullable: true })
  readonly before?: Relay.ConnectionCursor

  @Field({ nullable: true })
  readonly after?: Relay.ConnectionCursor

  @Field({ nullable: true })
  readonly first?: number

  @Field({ nullable: true })
  readonly last?: number

  abstract readonly filter?: CommonFilter[] // will be overriden

  abstract readonly sort?: CommonSort[] // will be overriden
}
