import { Controller, Get } from '@nestjs/common'

@Controller('')
export class HomeController {
  @Get()
  findAll(): string {
    return 'This is homepage.'
  }
}
