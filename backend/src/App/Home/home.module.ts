import { Module } from '@nestjs/common'
import { HomeController } from './Application/home.controller'

@Module({
  controllers: [HomeController],
})
export class HomeModule {}
