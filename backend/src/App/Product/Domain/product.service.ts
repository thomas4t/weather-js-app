/* eslint-disable prefer-object-spread */
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {
  ConnectionArguments,
  findDataFromConnectionArguments,
  DataFromConnectionArgumentsResults,
} from '@Common/pagination/relayPagination'
import { ProductTag } from '@App/ProductTag/Domain/productTag.entity'
import { Product } from './product.entity'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
    @InjectRepository(ProductTag)
    private readonly productTagRepo: Repository<ProductTag>,
  ) {}

  async getAll(args: ConnectionArguments): Promise<DataFromConnectionArgumentsResults<Product>> {
    return findDataFromConnectionArguments<Product>(
      args,
      (options) => this.productRepo.find(Object.assign({ relations: ['productTags'], ...options })),
      (options) => this.productRepo.count(options),
    )
  }

  async getOne(id: string): Promise<Product> {
    return this.productRepo.findOneOrFail({ where: { id } })
  }

  async getOneByName(name: string): Promise<Product> {
    return this.productRepo.findOneOrFail({ where: { name } })
  }

  async insertOne(product: Partial<Product>): Promise<Product> {
    const newProduct = this.productRepo.create({ ...product, productTags: [] })
    await this.productRepo.save(newProduct)
    const newProductTag = this.productTagRepo.create({ name: 'Foo' })
    await this.productTagRepo.save(newProductTag)
    return newProduct
  }

  async updateOne(product: Partial<Product>): Promise<Product> {
    const { id } = product
    await this.productRepo.update({ id }, product)
    return this.getOne(id)
  }

  async deleteOne(id: string): Promise<{ deleted: boolean }> {
    await this.productRepo.delete({ id })
    return { deleted: true }
  }
}
