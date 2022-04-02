import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { Product, ProductListConnection } from './product.gql'
import { ProductInsertArguments, ProductSearchArguments, ProductConnectionArguments } from './product.input'
import { ProductService } from '../Domain/product.service'

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => ProductListConnection)
  async getProducts(@Args() args: ProductConnectionArguments): Promise<ProductListConnection> {
    const { results, count, startCursor, endCursor, hasPreviousPage, hasNextPage } = await this.productService.getAll(args)
    return {
      pageInfo: { hasPreviousPage, hasNextPage, startCursor, endCursor },
      totalCount: count,
      edges: results,
    }
  }

  @Query(() => Product)
  async getProductByName(@Args('name', { type: () => String }) name: string) {
    return this.productService.getOneByName(name)
  }

  @Query(() => Product)
  async getProduct(@Args('productId') args: ProductSearchArguments): Promise<Product> {
    if (args.id) {
      return this.productService.getOne(args.id)
    }
    return null
  }

  @Mutation(() => Product)
  async insertProduct(@Args('newProduct') newProduct: ProductInsertArguments): Promise<Product> {
    return this.productService.insertOne(newProduct)
  }
}
