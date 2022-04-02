import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetOrdersOuery } from './order.queries'
import { OrderService } from '../../Domain/order.service'

@QueryHandler(GetOrdersOuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersOuery> {
  constructor(private readonly orderService: OrderService) {}

  async execute(query: GetOrdersOuery) {
    return this.orderService.getAll(query.args)
  }
}
