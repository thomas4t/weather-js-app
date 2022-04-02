import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { EventBus } from '@nestjs/cqrs'
import { Repository } from 'typeorm'
import { Order } from './order.entity'
import { OrderService } from './order.service'

const testOrder = new Order('111')

const allOrdersArray = [testOrder, new Order('222'), new Order('333'), new Order('444'), new Order('555')]

describe('classicPagination/order', () => {
  let service: OrderService
  let repo: Repository<Order>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: {
            find: jest
              .fn()
              .mockImplementation((args: any) => allOrdersArray.slice(args.skip || 0, (args.skip || 0) + (args.take || 0))),
            count: jest.fn().mockResolvedValue(allOrdersArray.length),
          },
        },
        {
          provide: EventBus,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get(OrderService)
    repo = module.get(getRepositoryToken(Order))
  })

  describe('paging', () => {
    it('should return an array - first 10', async () => {
      const orders = await service.getAll({ limit: 10 })
      expect(orders).toMatchObject({
        count: 5,
        hasNextPage: false,
        hasPreviousPage: false,
        results: allOrdersArray.slice(0, 10),
      })
      expect(repo.find).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: undefined,
          take: 10 + 1,
        }),
      )
    })

    it('should return an array - last 2', async () => {
      const orders = await service.getAll({ offset: Math.abs(2 - allOrdersArray.length), limit: 2 })
      expect(orders).toMatchObject({
        count: 5,
        hasNextPage: false,
        hasPreviousPage: true,
        results: allOrdersArray.slice(-2),
      })
      expect(repo.find).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 3,
          take: 2 + 1,
        }),
      )
    })

    it('should return an array and move through pages', async () => {
      // first page
      const ordersFirstPage = await service.getAll({ limit: 2 })
      expect(ordersFirstPage).toMatchObject({
        count: 5,
        hasNextPage: true,
        hasPreviousPage: false,
        results: allOrdersArray.slice(0, 2),
      })
      expect(repo.find).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: undefined,
          take: 2 + 1,
        }),
      )

      // go forwards
      const ordersNextPage = await service.getAll({
        limit: 2,
        offset: 2,
      })
      expect(ordersNextPage).toMatchObject({
        count: 5,
        hasNextPage: true,
        hasPreviousPage: true,
        results: allOrdersArray.slice(2, 4),
      })
      expect(repo.find).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 2,
          take: 2 + 1,
        }),
      )
    })
  })
})
