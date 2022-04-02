import { Injectable, Logger } from '@nestjs/common'
import { ICommand, ofType, Saga } from '@nestjs/cqrs'
import { Observable } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { OrderEventSuccess, OrderEventFail } from './order.events'

@Injectable()
export class OrderEventHandler {
  private readonly logger = new Logger(OrderEventHandler.name)

  @Saga()
  createOrderSuccess = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderEventSuccess),
      mergeMap((event: OrderEventSuccess) => {
        this.logger.debug(`Order Placed ${event.id}`)
        return []
      }),
    )
  }

  @Saga()
  createOrderFail = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderEventFail),
      mergeMap((event: OrderEventFail) => {
        this.logger.debug(`Order Placing Failed ${event.id}`)
        return []
      }),
    )
  }
}
