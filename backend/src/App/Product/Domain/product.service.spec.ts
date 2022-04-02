import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductTag } from '@App/ProductTag/Domain/productTag.entity'
import { Product } from './product.entity'
import { ProductService } from './product.service'

const testProduct = new Product('Test Product 1', 'Test description 1', 4)
testProduct.productTags = [new ProductTag()]
testProduct.productTags[0].name = 'Foo'

const allProductsArray = [
  testProduct,
  new Product('Test Product 2', 'Test description 2', 2),
  new Product('Test Product 3', 'Test description 3', 3),
  new Product('Test Product 4', 'Test description 4', 4),
  new Product('Test Product 5', 'Test description 5', 5),
]
allProductsArray[0].id = '1'
allProductsArray[1].id = '2'
allProductsArray[2].id = '3'
allProductsArray[3].id = '4'
allProductsArray[4].id = '5'

describe('ProductService', () => {
  let service: ProductService
  let repo: Repository<Product>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest
              .fn()
              .mockImplementation((args: any) => allProductsArray.slice(args.skip || 0, (args.take || 5) + (args.skip || 0))),
            count: jest.fn().mockResolvedValue(allProductsArray.length),
            findOneOrFail: jest.fn().mockResolvedValue(testProduct),
            create: jest.fn().mockReturnValue(testProduct),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: getRepositoryToken(ProductTag),
          useValue: {
            create: jest.fn().mockReturnValue(testProduct),
            save: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get(ProductService)
    repo = module.get(getRepositoryToken(Product))
  })

  describe('getAll', () => {
    it('basic test - first 10', async () => {
      const products = await service.getAll({ first: 10 })
      expect(products).toMatchObject({
        count: 5,
        startCursor: allProductsArray[0].id,
        endCursor: allProductsArray[4].id,
        hasNextPage: false,
        hasPreviousPage: false,
        results: allProductsArray.slice(0, 10).map((product) => ({ node: product })),
      })
      expect(repo.find).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: undefined,
          take: 10 + 1,
        }),
      )
    })
  })

  describe('getOne', () => {
    it('should get a single product', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail')
      expect(service.getOne('a uuid')).resolves.toEqual(testProduct)
      expect(repoSpy).toBeCalledWith({ where: { id: 'a uuid' } })
    })
  })

  describe('getOneByName', () => {
    it('should get one product', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail')
      expect(service.getOneByName(testProduct.name)).resolves.toEqual(testProduct)
      expect(repoSpy).toBeCalledWith({ where: { name: testProduct.name } })
    })
  })

  describe('insertOne', () => {
    it('should successfully insert a product', () => {
      expect(
        service.insertOne({
          name: testProduct.name,
          description: testProduct.description,
          availableCount: 4,
        }),
      ).resolves.toEqual({ ...testProduct, productTags: [{ name: 'Foo' }] })
      expect(repo.create).toBeCalledTimes(1)
      expect(repo.create).toBeCalledWith({
        name: testProduct.name,
        description: testProduct.description,
        availableCount: 4,
        productTags: [],
      })
      expect(repo.save).toBeCalledTimes(1)
    })
  })

  describe('updateOne', () => {
    it('should call the update method', async () => {
      const product = await service.updateOne({
        name: testProduct.name,
        description: testProduct.description,
        availableCount: 4,
        id: 'a uuid',
      })
      expect(product).toEqual(testProduct)
      expect(repo.update).toBeCalledTimes(1)
      expect(repo.update).toBeCalledWith(
        { id: 'a uuid' },
        { name: testProduct.name, description: testProduct.description, availableCount: 4, id: 'a uuid' },
      )
    })
  })

  describe('deleteOne', () => {
    it('should return {deleted: true}', () => {
      return expect(service.deleteOne('a uuid')).resolves.toEqual({ deleted: true })
    })

    it('should return {deleted: false, message: err.message}', () => {
      const repoSpy = jest.spyOn(repo, 'delete').mockRejectedValueOnce(new Error('Bad Delete Method.'))
      const prom = expect(service.deleteOne('a bad uuid')).rejects.toEqual(new Error('Bad Delete Method.'))
      expect(repoSpy).toBeCalledWith({ id: 'a bad uuid' })
      expect(repoSpy).toBeCalledTimes(1)
      return prom
    })
  })
})
