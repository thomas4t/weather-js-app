import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order } from './order.entity'
import { OrderService } from './order.service'

const testOrder = new Order('Test Order 1')

const allOrdersArray = [
  testOrder,
  new Order('Test Order 2'),
  new Order('Test Order 3'),
  new Order('Test Order 4'),
  new Order('Test Order 5'),
]

describe('relayPagination/order', () => {
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
              .mockImplementation((args: any) => allOrdersArray.slice(args.skip || 0, (args.take || 5) + (args.skip || 0))),
            count: jest.fn().mockResolvedValue(allOrdersArray.length),
          },
        },
      ],
    }).compile()

    service = module.get(OrderService)
    repo = module.get(getRepositoryToken(Order))
  })

  describe('paging', () => {
    it('should return an array - first 10', async () => {
      const orders = await service.getAll({ first: 10 })
      expect(orders).toMatchObject({
        count: 5,
        startCursor: allOrdersArray[0].id,
        endCursor: allOrdersArray[4].id,
        hasNextPage: false,
        hasPreviousPage: false,
        results: allOrdersArray.slice(0, 10).map((order) => ({ node: order })),
      })
      expect(repo.find).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: undefined,
          take: 10 + 1,
        }),
      )
    })

    it('should return an array - last 2', async () => {
      const orders = await service.getAll({ last: 2 })
      expect(orders).toMatchObject({
        count: 5,
        startCursor: allOrdersArray[3].id,
        endCursor: allOrdersArray[4].id,
        hasNextPage: false,
        hasPreviousPage: true,
        results: allOrdersArray.slice(-2).map((order) => ({ node: order })),
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
      const ordersFirstPage = await service.getAll({ first: 2 })
      expect(ordersFirstPage).toMatchObject({
        count: 5,
        startCursor: allOrdersArray[0].id,
        endCursor: allOrdersArray[1].id,
        hasNextPage: true,
        hasPreviousPage: false,
        results: allOrdersArray.slice(0, 2).map((order) => ({ node: order })),
      })
      expect(repo.find).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: undefined,
          take: 2 + 1,
        }),
      )

      // go forwards
      const ordersNextPage = await service.getAll({
        first: 2,
        after: ordersFirstPage.results[ordersFirstPage.results.length - 1].cursor,
      })
      expect(ordersNextPage).toMatchObject({
        count: 5,
        startCursor: allOrdersArray[2].id,
        endCursor: allOrdersArray[3].id,
        hasNextPage: true,
        hasPreviousPage: true,
        results: allOrdersArray.slice(2, 4).map((order) => ({ node: order })),
      })
      expect(repo.find).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 2,
          take: 2 + 1,
        }),
      )

      // go back
      const ordersPrevPage = await service.getAll({
        first: 2,
        before: ordersNextPage.results[0].cursor,
      })
      expect(ordersPrevPage).toMatchObject({
        count: 5,
        startCursor: allOrdersArray[0].id,
        endCursor: allOrdersArray[1].id,
        hasNextPage: true,
        hasPreviousPage: false,
        results: allOrdersArray.slice(0, 2).map((order) => ({ node: order })),
      })
      expect(repo.find).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 0,
          take: 2 + 1,
        }),
      )
    })
  })
})
