import { Injectable, Inject, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { User } from '@App/User/Domain/user.entity'
import { UserService } from '@App/User/Domain/user.service'
import { createToken, isPasswordHashAndSaltEqual } from '@App/User/Domain/passwordUtils'

@Injectable()
export class UserLoginService {
  private readonly logger = new Logger(UserLoginService.name)

  constructor(
    @Inject(UserService)
    private userService: UserService,
    private eventEmitter: EventEmitter2,
  ) {}

  async verifyLogin(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email)
    if (!user) return Promise.reject(`User with email ${email} not found.`)
    if (!isPasswordHashAndSaltEqual(user.passwordHash, password, user.passwordSalt)) {
      return Promise.reject(`User password does not match.`)
    }
    return user
  }

  createToken({ id, email }: User) {
    return createToken(id, email)
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    this.logger.debug('Called every 30 seconds')
    this.eventEmitter.emit('cron.called', { test: 1 })
  }

  @OnEvent('cron.called')
  onCronCalled() {
    this.logger.debug('Order created!')
  }
}
