import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs'
import { OrderCommand } from './order.command'
import { OrderService } from '../../Domain/order.service'
import { OrderEventSuccess } from '../Event/order.events'

@CommandHandler(OrderCommand)
export class OrderCommandHandler implements ICommandHandler<OrderCommand> {
  constructor(private readonly eventBus: EventBus, private readonly orderService: OrderService) {}

  async execute(command: OrderCommand) {
    await this.orderService.placeOrder(command.id)
    this.eventBus.publish(new OrderEventSuccess(command.id))
  }
}
