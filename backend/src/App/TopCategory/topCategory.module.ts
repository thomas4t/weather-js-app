import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TopCategory } from './Domain/TopCategory.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TopCategory])],
})
export class TopCategoryModule {}
