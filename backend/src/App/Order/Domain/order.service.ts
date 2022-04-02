import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PaginationArguments, findDataFromArguments } from '@Common/pagination/classicPagination'
import { Order } from './order.entity'

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private readonly orderRepo: Repository<Order>) {}

  async placeOrder(id: string) {
    const newOrder = this.orderRepo.create({ id })
    await this.orderRepo.save(newOrder)
  }

  async getAll(args: PaginationArguments) {
    return findDataFromArguments<Order>(
      args,
      (options) => this.orderRepo.find(options),
      (options) => this.orderRepo.count(options),
    )
  }
}
