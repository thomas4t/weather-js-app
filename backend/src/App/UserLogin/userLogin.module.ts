import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@App/User/Domain/user.entity'
import { UserModule } from '@App/User/user.module'
import { UserLoginService } from './Domain/userLogin.service'
import { UserLoginResolver } from './Application/userLogin.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  providers: [UserLoginService, UserLoginResolver],
})
export class UserLoginModule {}
