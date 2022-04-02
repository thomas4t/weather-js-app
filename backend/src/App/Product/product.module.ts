import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductTag } from '@App/ProductTag/Domain/productTag.entity'
import { ProductResolver } from './Application/product.resolver'
import { Product } from './Domain/product.entity'
import { ProductService } from './Domain/product.service'

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductTag])],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
