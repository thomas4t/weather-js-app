import { Resolver, Args, Query, Mutation } from '@nestjs/graphql'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Order, OrderPlacedStatus, OrderResult } from './order.gql'
import { OrderPlaceArguments, ProductPaginationArguments } from './order.input'
import { OrderCommand } from './Command/order.command'
import { GetOrdersOuery } from './Query/order.queries'

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Mutation(() => OrderPlacedStatus)
  async orderPlace(@Args('newOrder') order: OrderPlaceArguments): Promise<OrderPlacedStatus> {
    this.commandBus.execute(new OrderCommand(order.id))
    return {
      status: 'PENDING',
    }
  }

  @Query(() => OrderResult)
  async getOrders(@Args() args: ProductPaginationArguments): Promise<OrderResult> {
    return this.queryBus.execute(new GetOrdersOuery(args))
  }
}
