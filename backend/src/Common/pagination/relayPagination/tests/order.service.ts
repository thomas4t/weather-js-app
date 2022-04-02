import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {
  ConnectionArguments,
  findDataFromConnectionArguments,
  DataFromConnectionArgumentsResults,
} from '@Common/pagination/relayPagination'
import { Order } from './order.entity'

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private readonly orderRepo: Repository<Order>) {}

  async getAll(args: ConnectionArguments): Promise<DataFromConnectionArgumentsResults<Order>> {
    return findDataFromConnectionArguments<Order>(
      args,
      (options) => this.orderRepo.find(options),
      (options) => this.orderRepo.count(options),
    )
  }
}
