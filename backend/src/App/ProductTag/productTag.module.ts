import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductTag } from './Domain/productTag.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ProductTag])],
})
export class ProductTagModule {}
