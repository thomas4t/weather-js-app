import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderCommandHandler } from './Application/Command/order.commandHandler'
import { GetOrdersHandler } from './Application/Query/order.queryHandler'
import { Order } from './Domain/order.entity'
import { OrderEventHandler } from './Application/Event/order.eventHandler'
import { OrderService } from './Domain/order.service'
import { OrderResolver } from './Application/order.resolver'

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Order])],
  providers: [OrderCommandHandler, OrderEventHandler, GetOrdersHandler, OrderService, OrderResolver],
})
export class OrderModule {}
